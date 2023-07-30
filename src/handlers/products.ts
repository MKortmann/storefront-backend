import express, { Request, Response } from 'express';

import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  try {
    res.send(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_store_routes = (app: express.Application) => {
  app.get('/products', index);
};

export default product_store_routes;
