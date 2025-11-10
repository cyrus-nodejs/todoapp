import { Router } from 'express';
import * as controllers from '../controllers/todo';

const router = Router();

router.post('/', controllers.createTodo);
router.get('/', controllers.getTodos);
router.get('/:id', controllers.getTodoById);
router.put('/:id', controllers.updateTodo);
router.delete('/:id', controllers.deleteTodo);

export default router;