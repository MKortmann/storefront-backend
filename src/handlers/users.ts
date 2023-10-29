import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { Login } from '../types';

import { verifyAuthToken } from '../middleware/middleware';
import { logger } from '../logger';

const store = new UserStore();

interface CreateUserResponse {
  user: object;
  token: string;
}

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    logger.info(`fetched`);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ error: `Error fetching products`, err });
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await store.show(id);

    if (!user) {
      logger.warn(`User with id: ${id} not found`);
      return res.status(404).json({ error: `No user with this id: ${id}` });
    }

    const getLast5Orders = await store.lastOrdersByUser(id);

    const result = {
      user,
      orders: getLast5Orders,
    };

    logger.info(`Got user with id: ${id}, result: ${JSON.stringify(result)}`);

    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: `Error fetching user with id: ${id}`, err });
  }
};

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    logger.info(`User requested to be created: ${JSON.stringify(user)}`);
    const token = generateJwtToken(user);

    const result = await store.create(user);

    logger.info(`user created: ${JSON.stringify(result)}`);
    const response: CreateUserResponse = {
      user: result,
      token,
    };

    res.status(200).json(response);
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      error: `No possible to create an user: ${user}`,
      message: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await store.delete(id);
    if (!result) {
      logger.warn(`User with id: ${id} not found`);
      res.status(404).json({ error: `User with id: ${id} not found` });
    } else {
      logger.info(`User with id: ${id} deleted`);
      res.status(200).json({ info: `User with id: ${id} deleted` });
    }
  } catch (err) {
    res.status(400).json({ error: `Error deleting a user with id: ${id}`, err });
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
  try {
    logger.info(`User requested to be updated: ${JSON.stringify(user)}`);
    const result = await store.update(id, user);

    if (!result) {
      logger.warn(`User with id: ${id} not found`);
      res
        .status(404)
        .json({ error: `User with id: ${id} not found. No possible to update` });
    } else {
      logger.info(`User with id: ${id} updated`);
      res.status(200).json({ info: `User with id: ${id} updated`, user: user });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
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

    logger.info(`User tried to authenticate in: ${JSON.stringify(login)}`);

    const user = await store.authenticate(login);

    if (user) {
      const token = generateJwtToken(user);
      logger.info(`user authenticated!! - token: ${token}`);
      return res.status(200).json({ email: login.email, token });
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', err });
  }
};

const user_store_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/user/:id', verifyAuthToken, show);
  app.post('/user', verifyAuthToken, createUser);
  app.delete('/user/:id', verifyAuthToken, deleteUser);
  app.put('/user/:id', verifyAuthToken, updateUser);
  app.post('/user/authenticate', authenticateUser);
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
