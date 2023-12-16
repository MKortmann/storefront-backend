import express, { Request, Response } from 'express';

import { Order, OrderStore } from '../models/order';
import { logger } from '../logger';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json({ error: `Error fetching orders`, err });
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const order = await store.show(id);

    if (!order) {
      logger.warn(`Order with id: ${id} not found`);
      return res.status(404).json({ error: `No order with this id: ${id}` });
    }

    res.status(200).send(order);
  } catch (err) {
    res.status(400).json({ error: `Error fetching order with id: ${id}`, err });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const order: Order = {
    quantity: req.body.quantity,
    order_status: req.body.order_status,
    created_at: new Date(),
    product_id: req.body.product_id,
    user_id: req.body.user_id,
  };

  logger.info(`Order requested to be created: ${JSON.stringify(order)}`);

  try {
    const result = await store.create(order);
    logger.info(`order created: ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ error: `Error creating a new order: ${JSON.stringify(order)}`, err });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);

    if (!result) {
      logger.warn(`Order with id: ${id} not found`);
      res.status(404).json({ error: `Order with id: ${id} not found` });
    } else {
      logger.info(`Order with id: ${id} deleted`);
      res.status(200).json({ info: `Order with id: ${id} deleted` });
    }
  } catch (err) {
    res.status(400).json({ error: `Error deleting a order with id: ${id}`, err });
  }
};

const ordersByUser = async (req: Request, res: Response) => {
  try {
    const order = await store.currentOrderByUser(req.params.user_id, req.params.status);

    if (!order) {
      logger.warn(`Orders by user not found`);
      res.status(404).json({ error: `Orders by user not found` });
    } else {
      logger.info(`Order by user founded - ${JSON.stringify(order)}`);
      res.status(200).send(order);
    }
  } catch (err) {
    res.status(400).json({ error: `Error gettings orders by user`, err });
  }
};

const order_store_routes = (app: express.Application) => {
  app.get('/users/:user_id/orders/:status', ordersByUser);
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/order', createOrder);
  app.delete('/orders/:id', deleteOrder);
};

export default order_store_routes;
