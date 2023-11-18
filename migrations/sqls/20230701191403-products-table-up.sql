CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category VARCHAR(50)
);
-- Just Sample Data to be Able to Test Fully

INSERT INTO products (name, price, category)
VALUES
  ('Samsung Note 20', 650, 'Electronics'),
  ('Sweater', 29.99, 'Clothing'),
  ('Shovel', 19.99, 'Home and Garden');