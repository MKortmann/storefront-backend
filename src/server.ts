import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import bodyParser from 'body-parser';
import user_store_routes from './handlers/users';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

user_store_routes(app);

dotenv.config();
const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`Server started on port: ${port}`);
});
