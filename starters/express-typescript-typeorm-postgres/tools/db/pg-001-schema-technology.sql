\connect pgdatabase postgres

-- @INIT ----------------------------------------
CREATE TABLE public."technology" (
  id serial

  , name varchar(256) NOT NULL
  , PRIMARY KEY (id)
  , UNIQUE (name)
);

CREATE INDEX ON public."technology" (id)
