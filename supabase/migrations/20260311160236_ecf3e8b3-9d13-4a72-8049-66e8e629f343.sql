
CREATE OR REPLACE FUNCTION public.check_phone_unique(_phone text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.registrations
    WHERE phone = _phone
    AND archived_at IS NULL
  )
$$;
