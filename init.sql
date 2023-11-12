-- Create user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
    CREATE USER postgres;
  END IF;
END $$;

-- Alter user password
ALTER USER postgres WITH PASSWORD '12345';
