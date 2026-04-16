import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { AppDataSource } from './data-source';
import productRouter from './routes/router.products'
import settingsRouter from './routes/router.settings';

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(productRouter)
app.use(settingsRouter)

AppDataSource.initialize().then(() => {
  console.log('Database connected 🛜');

  app.listen(port, () => {
    console.log(`Server is running on Port ${port} 🏎️`);
  });
})
.catch((error) => {
    console.log("Connection Failed ❌", error)
})
