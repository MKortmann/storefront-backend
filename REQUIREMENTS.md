# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

> _More Info check file at root folder: Udacity-FullStack-P-02.postman_collection_

#### Products

- Index
  > products [GET]
- Show
  > products/:id [GET]
- Create [token required]
  > product [POST]
- [OPTIONAL] delete product by id
  > product/:id [DELETE]
- [OPTIONAL] Top 5 most popular products
  > products/top?number=:number [GET]
- [OPTIONAL] Products by category (args: product category)
  > products?category=:category [GET]

#### Users

- Index [Bearer token required]
  > users [GET]
- Show [Bearer token required]
  > user/:id [GET] > [OPTIONAL] -> at user/:id I will not only return the user but the last 5 orders order by timestamp descending...
- Create N [Bearer token required]
  > user [POST]
- DELETE N [Bearer token required]
  > user/:id [DEL]
- [OPTIONAL] UPDATE [Bearer token required]
  > user/:id [PUT]
- [OPTIONAL] AUTHENTICATE [Bearer token required]
  > user/authenticate [POST]

#### Orders

<!-- I just made one endpoint that fullfill the both first request below -->

- Current Order by user (args: user id)[Bearer token required]
  > users/:user_id/orders/current [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[Bearer token required]
  > users/:user_id/orders/completed [GET]
- [OPTIONAL] Add a popular products endpoint that sends back the 5 most commonly ordered items
  > products/top/:number

<!-- The both request above will be replaced by: -->

- Current Order by user (args: user id)[Bearer token required]

  > users/:user_id/orders/:status [GET]

- [OPTIONAL] Index
  > orders [GET]
- [OPTIONAL] Show
  > orders/:id [GET]
- [OPTINAL] Create [token required]
  > orders [POST]
  - [OPTIONAL] delete order by id
    > orders/:id [DELETE]

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
- email - optional
  > VARCHAR(100)
- password_digest
  > VARCHAR(150)

#### Orders

- id
  > INT PRIMARY KEY
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
