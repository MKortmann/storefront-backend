CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  quantity BIGINT,
  order_status VARCHAR(20),
  created_at TIMESTAMP,
  product_id bigint REFERENCES products(id),
  user_id bigint REFERENCES users(id)
)