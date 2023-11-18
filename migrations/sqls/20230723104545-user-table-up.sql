CREATE TABLE if not EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(150),
  lastname VARCHAR(150),
  email VARCHAR(100),
  password_digest VARCHAR (150)
);

-- Just Sample Data to be Able to Test Fully
INSERT INTO users (firstname, lastname, email, password_digest)
VALUES
  ('John', 'Doe', 'john.doe@example.com', '$2y$10$olR7IzAHyjBKsWnyneAXbO.SZaj4t4ueUksA2i0OPQeAzMlUM2qB.'),
  ('Jane', 'Smith', 'jane.smith@example.com', '$2y$10$olR7IzAHyjBKsWnyneAXbO.SZaj4t4ueUksA2i0OPQeAzMlUM2qB.'),
  ('Alice', 'Johnson', 'alice.johnson@example.com', '$2y$10$olR7IzAHyjBKsWnyneAXbO.SZaj4t4ueUksA2i0OPQeAzMlUM2qB.');