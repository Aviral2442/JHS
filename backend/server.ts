import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import db from './src/config/db_Config';

const PORT = process.env.SERVER_RUN_PORT || 5000;

const startEngine = async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error starting the server:', error);
        process.exit(1);
    }
};

startEngine();
