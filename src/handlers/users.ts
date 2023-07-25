import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  try {
    res.send(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_store_routes = (app: express.Application) => {
  app.get('/users', index);
};

export default user_store_routes;
