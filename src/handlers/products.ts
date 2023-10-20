import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verifyAuthToken } from '../middleware/middleware';

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
  console.log(`product data received: ${JSON.stringify(product)}`);
  try {
    res.send(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// token is required to be able to create a product
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

const productByCategory = async (req: Request, res: Response) => {
  console.log(`req.query.category: ${JSON.stringify(req.query.category)}`);
  if (!req.query.category) {
    return res.status(401).json({ error: 'Category is missing' });
  }
  const category: string = (req.query.category ?? '').toString();
  const products = await store.showByCategory(category);

  try {
    res.send(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getTopProducts = async (req: Request, res: Response) => {
  console.log(`req.query.number: ${JSON.stringify(req.query.number)}`);
  if (!req.query.number) {
    return res.status(401).json({ error: 'number is missing' });
  }
  const numbers: number = parseInt(String(req.query.number || 5), 10);
  const products = await store.showTopProducts(numbers);

  try {
    res.send(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_store_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/category', productByCategory);
  app.get('/products/top', getTopProducts);
  app.get('/products/:id', show);
  app.post('/product', verifyAuthToken, createProduct);
  app.delete('/product/:id', verifyAuthToken, deleteProduct);
};

export default product_store_routes;
