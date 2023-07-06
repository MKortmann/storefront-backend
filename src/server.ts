import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';

const app = express();
app.use(cors());
app.use('/', routes);

dotenv.config();
const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`Server started on port: ${port}`);
});
