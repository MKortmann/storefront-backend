import express, { Request, Response } from 'express';

const routes = express.Router();

// routes.get('/images', getThumbnail);
// routes.get('/:filename', getImage);

routes.get('/', (req: Request, res: Response) => {
  res.send('Simple Placeholder API!');
});

export default routes;
