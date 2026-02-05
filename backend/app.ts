import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/admin/auth.routes';
import productRoutes from './src/routes/website/product.routes';
import path from 'path/win32';

const app = express();


app.use(cors());
app.use(express.json({ limit: "50mb" })); // parse JSON
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//admin routes
app.use('/api/auth', authRoutes);

// website routes
app.use('/api/products', productRoutes);

export default app;