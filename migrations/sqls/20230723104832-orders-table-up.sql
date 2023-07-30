-- It behavies sames as SERIAL. Here just as learn contenct

CREATE SEQUENCE orders_id_seq START 0;


CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY DEFAULT nextval('orders_id_seq'),
  quantity BIGINT,
  order_status VARCHAR(20),
  created_at TIMESTAMP,
  product_id bigint REFERENCES products(id),
  user_id bigint REFERENCES users(id)
)