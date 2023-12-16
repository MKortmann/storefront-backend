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
  ('John', 'Doe', 'john.doe@yahoo.com', '$2b$10$34vVRl6sVjGtf1YTXd8q7ea7LvcWMMyum6s98GaDB5Eb51AQ6ns5m'),
  ('Jane', 'Smith', 'jane.smith@example.com', '$2b$10$34vVRl6sVjGtf1YTXd8q7ea7LvcWMMyum6s98GaDB5Eb51AQ6ns5m'),
  ('Alice', 'Johnson', 'alice.johnson@example.com', '$2b$10$34vVRl6sVjGtf1YTXd8q7ea7LvcWMMyum6s98GaDB5Eb51AQ6ns5m'),
  ('Alice2', 'Johnson', 'alice.johnson@example.com', '$2b$10$34vVRl6sVjGtf1YTXd8q7ea7LvcWMMyum6s98GaDB5Eb51AQ6ns5m');