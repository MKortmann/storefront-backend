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

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`user data received: ${JSON.stringify(product)}`);
  try {
    res.send(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product: any = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  console.log(`product: ${JSON.stringify(product)}`);
  try {
    const result = await store.create(product);
    console.log(`product created: ${JSON.stringify(result)}`);
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);
    res.json({ message: result });
  } catch (err) {
    res.status(400).json(err);
  }
};

const product_store_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/product', createProduct);
  app.delete('/product/:id', deleteProduct);
};

export default product_store_routes;
