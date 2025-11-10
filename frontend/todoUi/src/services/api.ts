import axios from 'axios';
import type { Todo} from '../types';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });


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