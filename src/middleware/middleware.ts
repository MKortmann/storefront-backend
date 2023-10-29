import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';

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

    logger.info(`token received: ${token}`);

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).json({ error: 'Token secret is not configured' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export const logRequestStart = (_req: Request, _res: Response, next: NextFunction) => {
  logger.info(
    '...............................................Started new request...............................................'
  );
  next();
};

export const logRequestFinish = (_req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    logger.info(
      '...............................................Finished request...............................................'
    );
  });
  next();
};
