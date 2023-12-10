import request from 'supertest';
import express from 'express';
import productRoutes from '../../handlers/products';
import { Product } from '../../models/product';
import { log } from 'winston';
import { logger } from '../../logger';

const app = express();
app.use(express.json());
productRoutes(app);

const bearerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6Ik1hcmNlbG8iLCJsYXN0bmFtZSI6IktvcnRtYW5uIiwiZW1haWwiOiJjb21wYW55bXZtc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ3ODk0NTYifSwiaWF0IjoxNjk5ODEzMTQyfQ.WX35z0E1aY3b0u7w-RBaGRaamcHJHN17o-bymPaNyIA';

// describe('Product handeler - GET /index', () => {
//   it('should respond with a list of products and status 200', async () => {
//     const response = await request(app).get('/products');

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

// describe('Product handeler - GET /show', () => {
//   it('should respond with a list of products by specific user id', async () => {
//     const response = await request(app).get('/products/1');

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

// describe('Product handeler - POST /product', () => {
//   it('it should create an product', async () => {
//     const newProduct: Product = {
//       name: 'Dark Chocolate',
//       price: 2,
//       category: 'sweet',
//     };

//     const response = await request(app)
//       .post('/product')
//       .set('Authorization', `Bearer ${bearerToken}`)
//       .send(newProduct)
//       .expect(200);
//     logger.warn(JSON.stringify(response));

//     expect(response.body).toBeDefined();
//   });
// });

describe('Product handeler - DELETE  /product/:id', () => {
  it('it should delete an product', async () => {
    const response = await request(app)
      .delete('/product/6')
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(200);

    // @ts-ignore
    console.log('Request:', response?.request);
    console.log('Response:', response.text);

    logger.warn(JSON.stringify(response));

    expect(response.body).toBeDefined();
  });
});
