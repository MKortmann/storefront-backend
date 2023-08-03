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

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`user data received: ${JSON.stringify(user)}`);
  try {
    res.send(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  const user: any = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(`user: ${JSON.stringify(user)}`);
  try {
    const result = await store.create(user);
    console.log(`user created: ${JSON.stringify(result)}`);
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);
    res.json({ message: result });
  } catch (err) {
    res.status(400).json(err);
  }
};

const user_store_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/user/:id', show);
  app.post('/user', createUser);
  app.delete('/user/:id', deleteUser);
};

export default user_store_routes;
