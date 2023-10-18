import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { Login } from '../types';

const store = new UserStore();

interface CreateUserResponse {
  user: object;
  token: string;
}

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
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(`user: ${JSON.stringify(user)}`);
  try {
    const token = generateJwtToken(user);

    const result = await store.create(user);
    console.log(`user created: ${JSON.stringify(result)}`);
    const response: CreateUserResponse = {
      user: result,
      token,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);

    res.status(400).json({
      error: 'No possible to create an user',
      message: err,
    });
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

/**
 *
 * @param req
 * @param res
 * @returns token - so the user can use it for further requests
 */
const authenticateUser = async (req: Request, res: Response) => {
  try {
    const login: Login = req.body;

    if (!login.email || !login.password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    console.log(`User tried to log in: ${JSON.stringify(login)}`);

    const user = await store.authenticate(login);

    if (user) {
      const token = generateJwtToken(user);

      return res.status(200).json(token);
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  const id = req.params.id;
  console.log(`id: ${id}`);
  console.log(`book: ${JSON.stringify(user)}`);
  const result = await store.update(id, user);
  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_store_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/user/:id', show);
  app.post('/user', createUser);
  app.delete('/user/:id', deleteUser);
  app.post('/user/authenticate', authenticateUser);
  app.put('/user/:id', updateUser);
};

export default user_store_routes;
function generateJwtToken(user: User) {
  const secret = process.env.TOKEN_SECRET!;

  if (!secret) {
    throw new Error('TOKEN_SECRET is not defined');
  }
  const token = jwt.sign({ user: user }, secret);
  return token;
}
