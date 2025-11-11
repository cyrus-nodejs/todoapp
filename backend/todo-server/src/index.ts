import dotenv from 'dotenv';

import cron from 'node-cron';
import axios from 'axios';
dotenv.config();

import app from './server';
import { connectDB } from './config/db';


const PORT = process.env.PORT || 4000;


cron.schedule('*/1440 * * * *', async () => {
  try {
    const url = process.env.SERVER_URL!;
    await axios.get(url);
    console.log('Ping sent to:', url);
  } catch (err) {
    console.error('Ping failed', err);
  }
});

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();