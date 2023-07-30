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

const order_store_routes = (app: express.Application) => {
  app.get('/orders', index);
};

export default order_store_routes;
