import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onViewDetails: (id: string) => void; // 👈 New prop
  highlighted: boolean;
}

export default function TodoItem({ todo, onDelete, onEdit, onViewDetails, highlighted }: Props) {
  return (
    <div
      className={`p-4 rounded shadow mb-2 flex justify-between items-center ${
        highlighted ? 'bg-yellow-100' : 'bg-white'
      }`}
      style={{ backgroundColor: todo.color || undefined }}
    >
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        {todo.deadline && (
          <p className="text-sm text-gray-600">
            Due: {new Date(todo.deadline).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(todo._id!)}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
        >
          View
        </button>
        <button
          onClick={() => onEdit(todo)}
          className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id!)}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
