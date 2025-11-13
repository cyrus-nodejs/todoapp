import express from 'express';

import cors, {CorsOptions} from "cors";
import todosRouter from './routes/todo';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger';

console.log(process.env.CLIENT_URL)

const app = express();

// const corsOptions = {
//   origin: process.env.CLIENT_URL, // Allow only the client URL
//   optionsSuccessStatus: 200,
// };

// Allow multiple origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.SERVICE_WORKER,
  process.env.SERVER_URL,
].filter(Boolean); // remove undefined entries


const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies or authorization headers if needed
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/todos', todosRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_req, res) => res.send('Welcome Todo API Service!'));

export default app;