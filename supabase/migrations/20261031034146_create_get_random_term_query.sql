CREATE OR REPLACE FUNCTION public.get_random_term()
RETURNS public.terms
LANGUAGE SQL
AS $$
  SELECT *
  FROM public.terms
  ORDER BY RANDOM()
  LIMIT 1;
$$;
