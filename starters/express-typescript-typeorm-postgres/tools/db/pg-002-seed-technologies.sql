\connect pgdatabase postgres

-- @INIT -----------------------------------------------------------------------

INSERT INTO public."technology" (
  id
  , name
) VALUES
    (1, 'Express.js')
  , (2, 'TypeScript')
  , (3, 'TypeOrm')
  , (4, 'Postresql')
;

ALTER SEQUENCE public.technology_id_seq RESTART WITH 5;
