import express, { Request, Response } from 'express';

import { OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();

  try {
    res.send(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`user data received: ${JSON.stringify(order)}`);
  try {
    res.send(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  const order: any = {
    quantity: req.body.quantity,
    order_status: req.body.order_status,
    created_at: new Date(),
    product_id: req.body.product_id,
    user_id: req.body.user_id,
  };
  console.log(`product: ${JSON.stringify(order)}`);
  try {
    const result = await store.create(order);
    console.log(`order created: ${JSON.stringify(result)}`);
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);
    res.json({ message: result });
  } catch (err) {
    res.status(400).json(err);
  }
};

const order_store_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/order', createOrder);
  app.delete('/orders/:id', deleteOrder);
};

export default order_store_routes;
