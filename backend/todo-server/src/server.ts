import express from 'express';

import cors  from "cors";
import todosRouter from './routes/todo';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger';

console.log(process.env.CLIENT_URL)

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow only the client URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/todos', todosRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_req, res) => res.send('Todo API'));

export default app;