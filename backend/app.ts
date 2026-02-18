import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/admin/auth.routes';
import websiteAuthRoutes from './src/routes/website/auth.routes';
import productRoutes from './src/routes/website/product.routes';
import mailerRoutes from './src/routes/mailer.routes';
import homeRoutes from './src/routes/website/home.routes';
import categoryRoutes from './src/routes/admin/category.routes';
import consumerRoutes from './src/routes/admin/consumer.routes';
import path from 'path/win32';

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ADMIN ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/mailer', mailerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/consumer', consumerRoutes);

// WEBSITE ROUTES
app.use('/api/auth', websiteAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/home', homeRoutes);

export default app;