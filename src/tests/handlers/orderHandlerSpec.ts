import request from 'supertest';
import express from 'express';
import orderRoutes from '../../handlers/orders';
import { Order } from '../../models/order';
import { log } from 'winston';
import { logger } from '../../logger';

const app = express();
app.use(express.json());
orderRoutes(app);

// describe('Order handeler - GET /index', () => {
//   it('should respond with a list of orders and status 200', async () => {
//     const response = await request(app).get('/orders');

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

// describe('Order handeler - GET /show', () => {
//   it('should respond with a list of orders by specific user and status 200', async () => {
//     const response = await request(app).get('/orders/1');

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

// describe('Order handeler - POST /order', () => {
//   it('it should create an order', async () => {
//     const newOrder: Order = {
//       quantity: 12,
//       order_status: 'active',
//       product_id: 1,
//       user_id: 1,
//     };
//     const response = await request(app).post('/order').send(newOrder).expect(200);
//     logger.warn(JSON.stringify(response));

//     expect(response.body).toBeDefined();
//   });
// });

// describe('Order handeler - DELETE  /order/:id', () => {
//   it('it should create an order', async () => {
//     const response = await request(app).delete('/orders/3').expect(200);
//     logger.warn(JSON.stringify(response));

//     expect(response.body).toBeDefined();
//   });
// });

// describe('Order handeler - GET  /order/:id', () => {
//   it('it should get order by specific user filtered by status', async () => {
//     const userId = 1;
//     const orderStatus = 'active';
//     const response = await request(app)
//       .get(`/users/${userId}/orders/${orderStatus}`)
//       .expect(200);
//     logger.warn(JSON.stringify(response));

//     expect(response.body).toBeDefined();
//   });
// });
