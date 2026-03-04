
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS plan_capital numeric,
  ADD COLUMN IF NOT EXISTS fee_expected numeric,
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS amount_paid numeric,
  ADD COLUMN IF NOT EXISTS payment_method text,
  ADD COLUMN IF NOT EXISTS payment_txid text,
  ADD COLUMN IF NOT EXISTS payment_address_used text,
  ADD COLUMN IF NOT EXISTS notes text;

CREATE TABLE IF NOT EXISTS public.mt5_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE NOT NULL UNIQUE,
  mt5_login text, mt5_password text, mt5_server text,
  account_type text NOT NULL DEFAULT 'demo',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.mt5_accounts ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.copy_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  master_registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE NOT NULL,
  slave_registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'active',
  copy_settings jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.copy_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access mt5" ON public.mt5_accounts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner view mt5" ON public.mt5_accounts FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.registrations r WHERE r.id = mt5_accounts.registration_id AND r.user_id = auth.uid()));
CREATE POLICY "Admin full access copy" ON public.copy_links FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner view copy" ON public.copy_links FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.registrations r WHERE (r.id = copy_links.master_registration_id OR r.id = copy_links.slave_registration_id) AND r.user_id = auth.uid()));

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view their own registrations" ON public.registrations;
  DROP POLICY IF EXISTS "Users can create their own registrations" ON public.registrations;
  DROP POLICY IF EXISTS "Admins can view all registrations" ON public.registrations;
  DROP POLICY IF EXISTS "Admins can update all registrations" ON public.registrations;
END $$;
CREATE POLICY "Owner view reg" ON public.registrations FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owner insert reg" ON public.registrations FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admin update reg" ON public.registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete reg" ON public.registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_mt5_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_mt5_accounts_updated_at BEFORE UPDATE ON public.mt5_accounts FOR EACH ROW EXECUTE FUNCTION public.update_mt5_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.mt5_accounts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.copy_links;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
