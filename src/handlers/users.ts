import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

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
    const secret = process.env.TOKEN_SECRET!;

    if (!secret) {
      throw new Error('TOKEN_SECRET is not defined');
    }
    const token = jwt.sign({ user: user }, secret);

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

const authenticateUser = async (req: Request, res: Response) => {
  console.log(req);
  const login: any = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(`user tryied to log logged: ${JSON.stringify(login)}`);

  //this part here we use to create a new product... I am adding at authenticate...
  // try {
  //   //verify the token
  //   const authorizationHeader = req.headers.authorization;
  //   const token = authorizationHeader?.split(' ')[1]!;
  //   console.log(authorizationHeader);

  //   console.log('token');
  //   console.log(token);
  //   jwt.verify(token, process.env.TOKEN_SECRET!)
  //   // jwt.verify(req.body.token, process.env.TOKEN_SECRET!)
  //   console.log("token verified")
  // } catch (err) {
  //   res.status(401)
  //   res.json(`Invalid token ${err}`)
  //   return
  // }

  const result = await store.authenticate(login);

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
};

export default user_store_routes;
