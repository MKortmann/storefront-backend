import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import bodyParser from 'body-parser';
import user_store_routes from './handlers/users';
import product_store_routes from './handlers/products';
import order_store_routes from './handlers/orders';
import { logRequestFinish, logRequestStart } from './middleware/middleware';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logRequestStart);
app.use('/', routes);
app.use(logRequestFinish);

user_store_routes(app);
product_store_routes(app);
order_store_routes(app);

dotenv.config();
const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`Server started on port: ${port}`);
});
