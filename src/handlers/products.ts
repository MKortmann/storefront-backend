import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../middleware/middleware';
import { logger } from '../logger';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products', err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);

    if (!product) {
      logger.warn(`Product with id: ${req.params.id} not found`);
      res.status(404).json({ error: `Product with id: ${req.params.id} not found` });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error fetching product with id: ${req.params.id}`, err });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    logger.info(`Product requested to be created: ${JSON.stringify(product)}`);
    const result = await store.create(product);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error creating product: ${JSON.stringify(product)}`, err });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);
    if (!result) {
      logger.warn(`Product with id: ${id} not found`);
      res.status(404).json({ error: `Product with id: ${id} not found` });
    } else {
      logger.info(`Product with id: ${id} deleted`);
      res.status(200).json({ info: `Product with id: ${id} deleted` });
    }
  } catch (err) {
    res.status(400).json({ error: `Error deleting a product with id: ${id}`, err });
  }
};

const productByCategory = async (req: Request, res: Response) => {
  const category: string = (req.query.category ?? '').toString();
  try {
    if (!category) {
      return res.status(401).json({ error: 'Category is on request missing' });
    }
    const products = await store.showByCategory(category);

    if (!products) {
      logger.warn(`No products by category: ${category}`);
      res.status(404).json({ error: `No products by category: ${category}` });
    } else {
      logger.info(`Products by ${category} found: ${products}`);
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(400).json({
      error: `No possible to get products by category: ${req.query.category}`,
      err,
    });
  }
};

const getTopProducts = async (req: Request, res: Response) => {
  const number = req.query.number;
  try {
    logger.info(`req.query.number: ${number})}`);
    if (!number) {
      logger.error(
        `Number: ${number} on request is missing. Please, specify a number for the top products.`
      );
      return res.status(401).json({
        error:
          'Number on request is missing. Please, specify a number for the top products.',
      });
    }
    const numbers: number = parseInt(String(number || 5), 10);
    const products = await store.showTopProducts(numbers);

    res.status(200).send(products);
  } catch (err) {
    res.status(400).json({
      error: `Could not find top ${number}products`,
      err,
    });
  }
};

const product_store_routes = (app: express.Application) => {
  /**
   * order matters: express processes them in the order they are declared
   *  I could also make use of regular esxpressions or route parameters to make th eroute definition more specific
   */

  app.get('/products/category', productByCategory);
  app.get('/products/top', getTopProducts);
  app.get('/products/:id', show);
  app.get('/products', index);
  app.post('/product', verifyAuthToken, createProduct);
  app.delete('/product/:id', verifyAuthToken, deleteProduct);
};

export default product_store_routes;
