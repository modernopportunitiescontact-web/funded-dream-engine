
-- ═══════════════════════════════════════════════════════
-- Copy Trading Engine: Full Database Schema Extension
-- ═══════════════════════════════════════════════════════

-- 1. Extend mt5_accounts with Deriv integration fields
ALTER TABLE public.mt5_accounts 
  ADD COLUMN IF NOT EXISTS deriv_token_encrypted text,
  ADD COLUMN IF NOT EXISTS copy_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS listener_status text NOT NULL DEFAULT 'inactive',
  ADD COLUMN IF NOT EXISTS last_listener_heartbeat_at timestamptz;

-- 2. Trade Events - raw detected MT5 events from masters
CREATE TABLE public.trade_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_id uuid NOT NULL REFERENCES public.mt5_accounts(id) ON DELETE CASCADE,
  master_mt5_login text,
  event_type text NOT NULL,
  ticket text NOT NULL,
  position_id text,
  symbol text,
  order_type text,
  direction text,
  lot numeric,
  entry_price numeric,
  stop_loss numeric,
  take_profit numeric,
  profit_loss numeric,
  raw_payload jsonb,
  event_hash text,
  status text NOT NULL DEFAULT 'pending',
  detected_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Idempotency constraint
CREATE UNIQUE INDEX idx_trade_events_idempotency ON public.trade_events(master_id, event_hash) WHERE event_hash IS NOT NULL;

-- 3. Trade Mappings - master/slave ticket linkage
CREATE TABLE public.trade_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_id uuid NOT NULL REFERENCES public.mt5_accounts(id) ON DELETE CASCADE,
  slave_id text,
  master_ticket text NOT NULL,
  slave_ticket text,
  master_position_id text,
  slave_position_id text,
  symbol text,
  master_lot numeric,
  multiplier_used numeric,
  slave_lot numeric,
  mapping_status text NOT NULL DEFAULT 'pending',
  opened_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_trade_mappings_master_ticket ON public.trade_mappings(master_id, master_ticket);

-- 4. Execution Logs - detailed copy attempt logs
CREATE TABLE public.execution_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_id uuid REFERENCES public.mt5_accounts(id) ON DELETE SET NULL,
  slave_id text,
  trade_event_id uuid REFERENCES public.trade_events(id) ON DELETE SET NULL,
  master_ticket text,
  slave_ticket text,
  symbol text,
  event_type text,
  requested_master_lot numeric,
  multiplier_used numeric,
  calculated_slave_lot numeric,
  normalized_slave_lot numeric,
  execution_status text NOT NULL DEFAULT 'pending',
  error_code text,
  error_message text,
  request_payload jsonb,
  response_payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_execution_logs_created ON public.execution_logs(created_at DESC);

-- 5. Copy Engine Status - health tracking per master
CREATE TABLE public.copy_engine_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_id uuid NOT NULL REFERENCES public.mt5_accounts(id) ON DELETE CASCADE,
  slave_id text,
  listener_status text NOT NULL DEFAULT 'inactive',
  execution_status text NOT NULL DEFAULT 'idle',
  last_trade_detected_at timestamptz,
  last_trade_copied_at timestamptz,
  last_error text,
  heartbeat_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(master_id)
);

-- 6. Symbol Mappings - broker symbol translation
CREATE TABLE public.symbol_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_symbol text NOT NULL,
  slave_symbol text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(master_symbol, slave_symbol)
);

-- ═══════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════

ALTER TABLE public.trade_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_engine_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symbol_mappings ENABLE ROW LEVEL SECURITY;

-- Admin full access on all engine tables
CREATE POLICY "Admin full access trade_events" ON public.trade_events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin full access trade_mappings" ON public.trade_mappings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin full access execution_logs" ON public.execution_logs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin full access copy_engine_status" ON public.copy_engine_status FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin full access symbol_mappings" ON public.symbol_mappings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trader can view their own trade events (for dashboard)
CREATE POLICY "Owner view trade_events" ON public.trade_events FOR SELECT TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM public.mt5_accounts m 
    JOIN public.registrations r ON r.id = m.registration_id 
    WHERE m.id = trade_events.master_id AND r.user_id = auth.uid()
  ));

-- ═══════════════════════════════════════════════════════
-- Realtime for admin monitoring
-- ═══════════════════════════════════════════════════════

ALTER PUBLICATION supabase_realtime ADD TABLE public.trade_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trade_mappings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.execution_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.copy_engine_status;

-- ═══════════════════════════════════════════════════════
-- Triggers for updated_at
-- ═══════════════════════════════════════════════════════

CREATE TRIGGER update_trade_mappings_updated_at
  BEFORE UPDATE ON public.trade_mappings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_copy_engine_status_updated_at
  BEFORE UPDATE ON public.copy_engine_status
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_symbol_mappings_updated_at
  BEFORE UPDATE ON public.symbol_mappings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
