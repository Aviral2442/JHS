import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/admin/auth.routes';
import websiteAuthRoutes from './src/routes/website/auth.routes';
import productRoutes from './src/routes/website/product.routes';
import mailerRoutes from './src/routes/mailer.routes';
import homeRoutes from './src/routes/website/home.routes';
import path from 'path/win32';

const app = express();


app.use(cors());
app.use(express.json({ limit: "50mb" })); // parse JSON
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//admin routes
app.use('/api/auth', authRoutes);
app.use('/api/mailer', mailerRoutes);
// website routes
app.use('/api/auth', websiteAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/web', homeRoutes);

export default app;