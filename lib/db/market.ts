import type { District, MetricEvent, Stall } from "@/lib/market/types";
import { getSql } from "./client";

type SqlQuery = (text: string, values: unknown[]) => PromiseLike<unknown>;

type StallRow = {
  id: string;
  slug: string;
  code: string;
  district_slug: string;
  name: string;
  description: string;
  status: Stall["status"];
  type: Stall["type"];
  sort_order: number;
  config: Record<string, unknown>;
};

type PublicStallRow = StallRow & { generations: number };
type PublicDistrictRow = PublicStallRow & {
  district_id: string;
  district_slug: string;
  district_name: string;
  district_accent: string;
  district_sort_order: number;
};

export type PublicStall = Stall & { generations: number };
export type PublicDistrict = District & { stalls: PublicStall[] };
export type SaveStallInput = Omit<Stall, "id">;
export type MoveStallInput = {
  districtSlug: string;
  slugs: string[];
};

async function query<T>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  return getSql()(strings, ...values) as unknown as Promise<T[]>;
}

function toStall(row: StallRow): Stall {
  return {
    id: row.id,
    slug: row.slug,
    code: row.code,
    districtSlug: row.district_slug,
    name: row.name,
    description: row.description,
    status: row.status,
    type: row.type,
    sortOrder: row.sort_order,
    config: row.config,
  };
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function recordMetricWith(
  sql: SqlQuery,
  slug: string,
  event: MetricEvent,
  date = new Date(),
) {
  const column = event === "visit" ? "visits" : event === "generation" ? "generations" : "image_saves";

  await sql(`INSERT INTO daily_metrics (metric_date, stall_id, ${column})
    SELECT $1::date, id, 1 FROM stalls WHERE slug = $2
    ON CONFLICT (metric_date, stall_id)
    DO UPDATE SET ${column} = daily_metrics.${column} + 1`, [toIsoDate(date), slug]);
}

export async function recordMetric(slug: string, event: MetricEvent, date = new Date()) {
  const sql = getSql();
  await recordMetricWith(sql.query.bind(sql), slug, event, date);
}

export async function listPublicDistricts(): Promise<PublicDistrict[]> {
  const rows = await query<PublicDistrictRow>`
    SELECT
      d.id AS district_id,
      d.slug AS district_slug,
      d.name AS district_name,
      d.accent AS district_accent,
      d.sort_order AS district_sort_order,
      s.id,
      s.slug,
      s.code,
      s.name,
      s.description,
      s.status,
      s.type,
      s.sort_order,
      s.config,
      COALESCE(metrics.generations, 0) AS generations
    FROM districts d
    LEFT JOIN stalls s ON s.district_id = d.id AND s.status IN ('open', 'coming_soon')
    LEFT JOIN daily_metrics metrics ON metrics.stall_id = s.id AND metrics.metric_date = CURRENT_DATE
    ORDER BY d.sort_order, s.sort_order`;

  const districts = new Map<string, PublicDistrict>();

  for (const row of rows) {
    const district: PublicDistrict = districts.get(row.district_slug) ?? {
      id: row.district_id,
      slug: row.district_slug,
      name: row.district_name,
      accent: row.district_accent,
      sortOrder: row.district_sort_order,
      stalls: [],
    };

    if (row.id) {
      district.stalls.push({ ...toStall(row), generations: Number(row.generations) });
    }

    districts.set(district.slug, district);
  }

  return [...districts.values()];
}

export async function getPublicStall(slug: string): Promise<PublicStall | null> {
  const rows = await query<PublicStallRow>`
    SELECT
      s.id,
      s.slug,
      s.code,
      d.slug AS district_slug,
      s.name,
      s.description,
      s.status,
      s.type,
      s.sort_order,
      s.config,
      COALESCE(metrics.generations, 0) AS generations
    FROM stalls s
    JOIN districts d ON d.id = s.district_id
    LEFT JOIN daily_metrics metrics ON metrics.stall_id = s.id AND metrics.metric_date = CURRENT_DATE
    WHERE s.slug = ${slug} AND s.status IN ('open', 'coming_soon')`;

  const row = rows[0];
  return row ? { ...toStall(row), generations: Number(row.generations) } : null;
}

export async function listAdminStalls(): Promise<Stall[]> {
  const rows = await query<StallRow>`
    SELECT
      s.id,
      s.slug,
      s.code,
      d.slug AS district_slug,
      s.name,
      s.description,
      s.status,
      s.type,
      s.sort_order,
      s.config
    FROM stalls s
    JOIN districts d ON d.id = s.district_id
    ORDER BY d.sort_order, s.sort_order`;

  return rows.map(toStall);
}

export async function listDistricts(): Promise<District[]> {
  const rows = await query<{ id: string; slug: string; name: string; accent: string; sort_order: number }>`
    SELECT id, slug, name, accent, sort_order FROM districts ORDER BY sort_order`;
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    accent: row.accent,
    sortOrder: row.sort_order,
  }));
}

export async function deleteStall(slug: string) {
  const rows = await query<{ slug: string }>`DELETE FROM stalls WHERE slug = ${slug} RETURNING slug`;
  if (!rows[0]) throw new Error("Stall not found");
}

export async function listMetricSummary() {
  return query<{ slug: string; visits: number; generations: number; image_saves: number }>`
    SELECT s.slug, COALESCE(SUM(m.visits), 0)::integer AS visits,
      COALESCE(SUM(m.generations), 0)::integer AS generations,
      COALESCE(SUM(m.image_saves), 0)::integer AS image_saves
    FROM stalls s LEFT JOIN daily_metrics m ON m.stall_id = s.id
    GROUP BY s.slug ORDER BY s.slug`;
}

export async function listTodayGenerationCounts() {
  const rows = await query<{ slug: string; generations: number }>`
    SELECT s.slug, COALESCE(m.generations, 0)::integer AS generations
    FROM stalls s
    LEFT JOIN daily_metrics m ON m.stall_id = s.id AND m.metric_date = CURRENT_DATE`;
  return Object.fromEntries(rows.map((row) => [row.slug, Number(row.generations)]));
}

export async function saveStall(input: SaveStallInput): Promise<Stall> {
  const rows = await query<StallRow>`
    INSERT INTO stalls (slug, code, district_id, name, description, status, type, sort_order, config)
    SELECT
      ${input.slug},
      ${input.code},
      id,
      ${input.name},
      ${input.description},
      ${input.status},
      ${input.type},
      ${input.sortOrder},
      ${JSON.stringify(input.config)}::jsonb
    FROM districts
    WHERE slug = ${input.districtSlug}
    ON CONFLICT (slug) DO UPDATE SET
      code = EXCLUDED.code,
      district_id = EXCLUDED.district_id,
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      status = EXCLUDED.status,
      type = EXCLUDED.type,
      sort_order = EXCLUDED.sort_order,
      config = EXCLUDED.config,
      updated_at = now()
    RETURNING
      id,
      slug,
      code,
      (SELECT slug FROM districts WHERE id = stalls.district_id) AS district_slug,
      name,
      description,
      status,
      type,
      sort_order,
      config`;

  const row = rows[0];
  if (!row) {
    throw new Error(`Unknown district: ${input.districtSlug}`);
  }

  return toStall(row);
}

export async function moveStall(input: MoveStallInput) {
  const rows = await query<{ complete: boolean }>`
    WITH district AS (
      SELECT id FROM districts WHERE slug = ${input.districtSlug}
    ), ordered AS (
      SELECT slug, ordinality - 1 AS sort_order
      FROM unnest(${input.slugs}::text[]) WITH ORDINALITY AS input_order(slug, ordinality)
    ), updated AS (
      UPDATE stalls
      SET sort_order = ordered.sort_order, updated_at = now()
      FROM district, ordered
      WHERE stalls.district_id = district.id AND stalls.slug = ordered.slug
      RETURNING stalls.slug
    )
    SELECT (SELECT count(*) FROM updated) = ${input.slugs.length} AS complete`;

  if (!rows[0]?.complete) {
    throw new Error("Every stall must belong to the requested district");
  }
}
