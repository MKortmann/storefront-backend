-- Create user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
    CREATE USER postgres;
  END IF;
END $$;

-- Alter user password
ALTER USER postgres WITH PASSWORD '12345';

-- Switch to the postgres database
\c postgres

-- Drop and recreate databases
DROP DATABASE IF EXISTS store;
CREATE DATABASE store;
DROP DATABASE IF EXISTS store_test;
CREATE DATABASE store_test;
