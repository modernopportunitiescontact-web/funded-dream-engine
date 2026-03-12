
-- Phase change history table
CREATE TABLE public.phase_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  old_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_by UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.phase_history ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admin full access phase_history" ON public.phase_history
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Owner can view their own history
CREATE POLICY "Owner view phase_history" ON public.phase_history
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.registrations r
    WHERE r.id = phase_history.registration_id AND r.user_id = auth.uid()
  ));
