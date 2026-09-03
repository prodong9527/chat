UPDATE stalls
SET name = '投名状摊',
    description = '凑齐四样凭据，递一张入府投名状',
    type = 'local',
    updated_at = now()
WHERE slug = 'huafu-badge';
