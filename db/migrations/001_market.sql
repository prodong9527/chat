CREATE TABLE IF NOT EXISTS districts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  accent text NOT NULL,
  sort_order integer NOT NULL CHECK (sort_order >= 0)
);
-- migrate:break
CREATE TABLE IF NOT EXISTS stalls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  district_id uuid NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('open', 'coming_soon', 'closed')),
  type text NOT NULL CHECK (type IN ('generic_ai', 'custom_ai', 'daily', 'local')),
  sort_order integer NOT NULL CHECK (sort_order >= 0),
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- migrate:break
CREATE TABLE IF NOT EXISTS daily_metrics (
  metric_date date NOT NULL,
  stall_id uuid NOT NULL REFERENCES stalls(id) ON DELETE CASCADE,
  visits integer NOT NULL DEFAULT 0,
  generations integer NOT NULL DEFAULT 0,
  image_saves integer NOT NULL DEFAULT 0,
  PRIMARY KEY (metric_date, stall_id)
);
-- migrate:break
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
