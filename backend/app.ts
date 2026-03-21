import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/admin/auth.routes';
import websiteAuthRoutes from './src/routes/website/auth.routes';
import productRoutes from './src/routes/website/product.routes';
import mailerRoutes from './src/routes/mailer.routes';
import homeRoutes from './src/routes/website/home.routes';
import categoryRoutes from './src/routes/admin/category.routes';
import consumerRoutes from './src/routes/admin/consumer.routes';
import vendorRoutes from './src/routes/admin/vendor.routes';
import bookingRoutes from './src/routes/admin/booking.routes';
import settingRoutes from './src/routes/website/setting.routes';
import path from 'path/win32';
import mailRoutes from './src/routes/mailer.routes';

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
app.use('/api/vendor', vendorRoutes);
app.use('/api/booking', bookingRoutes);

// WEBSITE ROUTES
app.use('/api/auth', websiteAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/setting', settingRoutes);
app.use('/api/mailer', mailRoutes);

export default app;