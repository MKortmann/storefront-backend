import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use('/', routes);

// Load your database config from the JSON file
// const dbConfig = require('../databse.json').dev;

// // Set up the database connection pool
// const pool = new Pool({
//   host: dbConfig.host,
//   port: dbConfig.port,
//   database: dbConfig.database,
//   user: dbConfig.user,
//   password: dbConfig.password,
// });

dotenv.config();
const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`Server started on port: ${port}`);
});
