import request from 'supertest';
import express from 'express';
import productRoutes from '../../handlers/products';
import { Product } from '../../models/product';
import { logger } from '../../logger';

const app = express();
app.use(express.json());
productRoutes(app);

const bearerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6Ik1hcmNlbG8iLCJsYXN0bmFtZSI6IktvcnRtYW5uIiwiZW1haWwiOiJjb21wYW55bXZtc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ3ODk0NTYifSwiaWF0IjoxNjk5ODEzMTQyfQ.WX35z0E1aY3b0u7w-RBaGRaamcHJHN17o-bymPaNyIA';

describe('Product handeler - GET /index', () => {
  it('should respond with a list of products and status 200', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('Product handeler - GET /show', () => {
  it('should respond with a list of products by specific user id', async () => {
    const response = await request(app).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('Product handeler - POST /product', () => {
  it('it should create an product', async () => {
    const newProduct: Product = {
      name: 'LG TV',
      price: 2000,
      url: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'LG 85, 4k resolution',
      category: 'Electronics',
    };

    const response = await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(newProduct)
      .expect(200);
    logger.warn(JSON.stringify(response));

    expect(response.body).toBeDefined();
  });
});

describe('Product handeler - DELETE  /product/:id', () => {
  it('it should delete an product', async () => {
    const response = await request(app)
      .delete('/product/4')
      .set('Authorization', `Bearer ${bearerToken}`);
    expect([200, 404]).toContain(response.status);

    logger.warn(JSON.stringify(response));

    expect(response.body).toBeDefined();
  });
});

describe('Product handeler - GET PRODUCTS BY CATEGORY  /products/category', () => {
  it('it should get a product by category', async () => {
    const response = await request(app)
      .get('/products/category?category=Clothing')
      .expect(200);

    logger.warn(JSON.stringify(response.text));
    const result = JSON.parse(response.text);

    expect(response.body).toBeDefined();
    expect(result[0].id).toBe(6);
    expect(result[0].name).toBe('Shirt');
    expect(result[0].price).toBe('29.99');
    expect(result[0].category).toBe('Clothing');
  });
});

describe('Product handeler - GET TOP PRODUCTS  /products/top', () => {
  it('it should get a product by category', async () => {
    const response = await request(app).get('/products/top?number=3').expect(200);

    logger.warn(JSON.stringify(response.text));
    expect(response.text).toBeDefined();
  });
});
