import axios from 'axios';
import type { Todo} from '../types';
import { env } from '../config/env';
const API = axios.create({ baseURL: env.API_BASE_URL, timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },  });


// ✅ Get all todos
export const fetchTodos = () => API.get<Todo[]>('/todos');


// ✅ Create new todo
export const createTodo = (payload: Partial<Todo>) => API.post('/todos', payload);

// ✅ Get single todo by ID
export const fetchTodoById = (id: string) => API.get<Todo>(`/todos/${id}`);

// ✅ Update todo
export const updateTodo = (id: string, payload: Partial<Todo>) => API.put(`/todos/${id}`, payload);

// ✅ Delete todo
export const deleteTodo = (id: string) => API.delete(`/todos/${id}`);