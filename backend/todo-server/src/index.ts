import dotenv from 'dotenv';
dotenv.config();

import app from './server';
import { connectDB } from './config/db';


const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();