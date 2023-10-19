import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }
    const token = authorizationHeader?.split(' ')[1]!;

    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    console.log(`token received: ${token}`);

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).json({ error: 'Token secret is not configured' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
