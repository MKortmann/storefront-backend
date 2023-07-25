# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  > products [GET]
- Show
  > products/:id [GET]
- Create [token required]
  > products [POST]
- [OPTIONAL] Top 5 most popular products
  > products/top?number=:number [GET]
- [OPTIONAL] Products by category (args: product category)
  > products?category=:category [GET]

#### Users

- Index [Bearer token required]

  > users [GET]

- Show [Bearer token required]
  > user/:id [GET]
- Create N[Bearer token required]
  > user [POST]

#### Orders

- Current Order by user (args: user id)[Bearer token required]
  > users/:user_id/orders/current [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[Bearer token required]
  > users/:user_id/orders/completed [GET]

## Data Shapes

#### Product

- id
  > SERIAL PRIMARY KEY
- name
  > VARCHAR(100)
- price
  > INTEGER
- [OPTIONAL] category
  > VARCHAR(50)

#### User

- id
  > SERIAL PRIMARY KEY
- firstName
  > VARCHAR(150)
- lastName
  > VARCHAR(150)
- password_digest
  > VARCHAR(150)
- email - optional
  > VARCHAR(100)

#### Orders

- id
  > SERIAL PRIMARY KEY
- quantity of each product in the order
  > BIGINT
- order_status (active or complete)
  > VARCHAR(20)
- created_at
  > TIMESTAMP (optional)
- id of each product in the order
  > product_id (foreign key to products(id))
  - > BIGINT REFERENCES products(id)
- user_id (foreign key to users(id))
  > BIGINT REFERENCES users(id)
