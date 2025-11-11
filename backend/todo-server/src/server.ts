import express from 'express';

import cors, { CorsOptions } from "cors";
import todosRouter from './routes/todo';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_req, res) => res.send('Todo API'));

export default app;