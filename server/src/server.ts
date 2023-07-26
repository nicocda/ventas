// src/server.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app: Application = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
