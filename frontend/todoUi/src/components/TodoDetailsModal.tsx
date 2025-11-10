import { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { fetchTodoById } from '../services/api';

interface Props {
  todoId: string | null;
  onClose: () => void;
}

export default function TodoDetailsModal({ todoId, onClose }: Props) {
  const [todo, setTodo] = useState<Todo | null >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todoId) {
      setLoading(true);
      fetchTodoById(todoId)
        .then((res) => setTodo(res.data))
        .finally(() => setLoading(false));
    }
  }, [todoId]);

  if (!todoId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todo ? (
          <>
            <h2 className="text-xl font-bold mb-3">{todo.title}</h2>
            {todo.description && (
              <p className="text-gray-600 mb-3">{todo.description}</p>
            )}

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Category:</span>{' '}
                {todo.category || '—'}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>{' '}
                {todo.deadline
                  ? new Date(todo.deadline).toLocaleString()
                  : 'No deadline'}
              </p>
              <p>
                <span className="font-semibold">Reminder:</span>{' '}
                {todo.reminder
                  ? new Date(todo.reminder).toLocaleString()
                  : 'No reminder'}
              </p>
              {todo.color && (
                <div className="mt-3">
                  <span className="font-semibold">Background:</span>
                  <div
                    className="w-8 h-8 rounded-full border ml-2 inline-block align-middle"
                    style={{ backgroundColor: todo.color }}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Todo not found</p>
        )}
      </div>
    </div>
  );
}
