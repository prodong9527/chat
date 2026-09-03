UPDATE stalls
SET status = 'open',
    description = '生成一份华府新员工说明书',
    config = '{"game":"newcomer-guide"}'::jsonb,
    updated_at = now()
WHERE slug = 'newcomer-guide';

-- migrate:break

UPDATE stalls
SET status = 'open',
    description = '抽一份会议逃生演练通报',
    config = '{"game":"meeting-exit"}'::jsonb,
    updated_at = now()
WHERE slug = 'meeting-exit';

-- migrate:break

UPDATE stalls
SET status = 'open',
    description = '颁一张年度摸鱼成果奖',
    config = '{"game":"performance-defense"}'::jsonb,
    updated_at = now()
WHERE slug = 'performance-defense';
