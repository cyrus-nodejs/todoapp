import { Router } from 'express';
import * as controllers from '../controllers/todo';
import { validateJoi } from '../middleware/validateJoi';
import { todoSchema } from '../validators/todoValidator';


const router = Router();

router.post('/', validateJoi(todoSchema), controllers.createTodo);
router.get('/', controllers.getTodos);
router.get('/:id', controllers.getTodoById);
router.put('/:id',validateJoi(todoSchema), controllers.updateTodo);
router.delete('/:id', controllers.deleteTodo);

export default router;