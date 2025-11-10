
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onViewDetails: (id: string) => void;
  highlightedTodos: string[];
}

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
  onEdit,
  onViewDetails,
  highlightedTodos,
}: Props) {
  // ✅ Prevent crash if todos is undefined or not an array
  if (!Array.isArray(todos)) {
    console.warn('Expected todos to be an array, got:', todos);
    todos = [];
  }

  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
            highlighted={highlightedTodos.includes(todo._id!)}
          />
        ))
      )}
    </div>
  );
}
