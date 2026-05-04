DO
$$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'rehilete') THEN
    CREATE ROLE rehilete WITH LOGIN PASSWORD 'rehilete123' CREATEDB;
  END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE rehilete_db TO rehilete;
\connect rehilete_db
GRANT ALL ON SCHEMA public TO rehilete;
ALTER SCHEMA public OWNER TO rehilete;
