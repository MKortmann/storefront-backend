-- It behavies sames as SERIAL. Here just as learn contenct
CREATE SEQUENCE orders_id_seq START 1;


CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY DEFAULT nextval('orders_id_seq'),
  quantity BIGINT,
  order_status VARCHAR(20),
  created_at TIMESTAMP,
  product_id bigint REFERENCES products(id),
  user_id bigint REFERENCES users(id)
);

-- Just Sample Data to be Able to Test Fully
INSERT INTO orders (quantity, order_status, created_at, product_id, user_id)
VALUES
  (10, 'actived', '2023-01-01 10:00:00', 1, 1),
  (5, 'actived', '2023-01-02 12:30:00', 2, 2),
  (20, 'Completed', '2023-01-03 15:45:00', 3, 1);