import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';

const app = express();

import productRoutes from './src/routes/productRoutes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);
app.use('/api/products/', productRoutes);

export default app;