import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { AppDataSource } from './data-source';
import productRouter from './routes/router.products';
import settingsRouter from './routes/router.settings';
import recommendationRouter from './routes/router.recommendations';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(productRouter)
app.use(settingsRouter)
app.use(recommendationRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected 🛜');

    app.listen(port, () => {
      console.log(`Server is running on Port ${port} 🏎️`);
    });
  })
  .catch((error) => {
    console.log('Connection Failed ❌', error);
  });
