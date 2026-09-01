INSERT INTO districts (slug, name, accent, sort_order)
VALUES
  ('entry', '入职服务街', 'seal-red', 0),
  ('entertainment', '文娱消遣巷', 'lantern-gold', 1),
  ('workplace', '职场求生路', 'jade-green', 2),
  ('reports', '汇报加工厂', 'ink-blue', 3),
  ('errands', '杂务回收站', 'brick-orange', 4)
ON CONFLICT DO NOTHING;
-- migrate:break
INSERT INTO stalls (slug, code, district_id, name, description, status, type, sort_order, config)
SELECT seed.slug, seed.code, districts.id, seed.name, seed.description, seed.status, seed.type, seed.sort_order, seed.config::jsonb
FROM (
  VALUES
    ('huafu-badge', 'A-01', 'entry', '华府人事摊', '生成一张离谱工牌', 'open', 'custom_ai', 0, '{}'),
    ('job-draw', 'A-02', 'entry', '入职抽签处', '抽一张今日入职签', 'open', 'local', 1, '{}'),
    ('duilian', 'B-01', 'entertainment', '对穿肠擂台', '和对穿肠过几招', 'open', 'custom_ai', 0, '{}'),
    ('desk-fortune', 'B-02', 'entertainment', '工位玄学铺', '摇一支今日职场卦', 'open', 'daily', 1, '{}'),
    ('read-reply', 'C-01', 'workplace', '已读乱回亭', '把同事消息回得煞有介事', 'open', 'generic_ai', 0, '{}'),
    ('blame-translation', 'C-02', 'workplace', '甩锅翻译局', '把职场黑话翻译明白', 'open', 'generic_ai', 1, '{}'),
    ('leave-request', 'C-03', 'workplace', '请假事务所', '代拟一份请假理由', 'open', 'generic_ai', 2, '{}'),
    ('weekly-report', 'D-01', 'reports', '周报膨胀厂', '把周报吹得天花乱坠', 'open', 'generic_ai', 0, '{}'),
    ('ticket', 'E-01', 'errands', '今日工单', '领一张今日荒唐工单', 'open', 'custom_ai', 0, '{}'),
    ('petition', 'E-02', 'errands', '华府信访办', '递上一份不正经状子', 'open', 'custom_ai', 1, '{}')
) AS seed(slug, code, district_slug, name, description, status, type, sort_order, config)
JOIN districts ON districts.slug = seed.district_slug
ON CONFLICT DO NOTHING;
