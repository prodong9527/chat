import { describe, expect, it } from "vitest";
import { recordMetricWith } from "./market";

type SqlCall = {
  text: string;
  values: unknown[];
};

function createRecordingSql() {
  const calls: SqlCall[] = [];

  const sql = async (text: string, values: unknown[] = []) => {
    calls.push({ text, values });
    return [];
  };

  return { calls, sql };
}

describe("recordMetricWith", () => {
  it("increments a generation aggregate with one upsert", async () => {
    const sql = createRecordingSql();

    await recordMetricWith(sql.sql, "huafu-badge", "generation", new Date("2026-09-01"));

    expect(sql.calls).toHaveLength(1);
    expect(sql.calls[0].text).toContain("ON CONFLICT (metric_date, stall_id)");
    expect(sql.calls[0].text).toContain("generations");
    expect(sql.calls[0].values).toEqual(["2026-09-01", "huafu-badge"]);
  });
});
