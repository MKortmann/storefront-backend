import request from 'supertest';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'http';
import routes from '../routes/index';

const app = express();

describe('Express app', () => {
  let server: Server;
  const PORT = 5000;

  beforeAll(() => {
    app.use(cors());
    app.use('/', routes);
    dotenv.config();
    server = app.listen(PORT, (): void => {
      console.log(`Test server on port ${PORT}`);
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a text/html type', async () => {
    const res = await request(app).get('/');
    expect(res.type).toBe('text/html');
  });

  it('should serve static files from public directory', async () => {
    const res = await request(app).get('/');
    expect(res.text).toContain('Simple Placeholder API');
  });
});
