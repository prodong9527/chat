INSERT INTO stalls (slug, code, district_id, name, description, status, type, sort_order, config)
SELECT input.slug, input.code, districts.id, input.name, input.description, 'coming_soon', 'generic_ai', input.sort_order, '{}'::jsonb
FROM (VALUES
  ('newcomer-guide', 'A-03', 'entry', '入府适应办', '新人求生手册，筹备中', 2),
  ('meeting-exit', 'C-04', 'workplace', '会议脱身处', '体面离场话术，筹备中', 3),
  ('performance-defense', 'D-02', 'reports', '绩效申辩堂', '年度成绩效自评，筹备中', 1)
) AS input(slug, code, district_slug, name, description, sort_order)
JOIN districts ON districts.slug = input.district_slug
ON CONFLICT (slug) DO UPDATE SET code = EXCLUDED.code, district_id = EXCLUDED.district_id, name = EXCLUDED.name, description = EXCLUDED.description, status = EXCLUDED.status, type = EXCLUDED.type, sort_order = EXCLUDED.sort_order, updated_at = now();
