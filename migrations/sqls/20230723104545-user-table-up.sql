CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(150),
  lastname VARCHAR(150),
  email VARCHAR(100),
  password_digest VARCHAR (150)
);