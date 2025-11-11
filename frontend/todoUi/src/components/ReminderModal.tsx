import { useEffect } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onDismiss: (id: string) => void;
  onSnooze: (id: string, minutes: number) => void;
}

export default function ReminderModal({ todo, onDismiss, onSnooze }: Props) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss(todo._id!);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [todo._id, onDismiss]);

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-96 relative animate-fadeIn"
        role="dialog"
        aria-labelledby="reminder-title"
        aria-modal="true"
      >
        <button
          onClick={() => onDismiss(todo._id!)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <h2
          id="reminder-title"
          className="text-2xl font-semibold text-blue-700 mb-3 flex items-center gap-2"
        >
          ⏰ Reminder
        </h2>

        <div className="space-y-2">
          <p className="font-medium text-lg">{todo.title}</p>
          {todo.description && (
            <p className="text-gray-600">{todo.description}</p>
          )}
          {todo.deadline && (
            <p className="text-sm text-gray-500">
              📅 Deadline:{' '}
              {new Date(todo.deadline).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={() => onSnooze(todo._id!, 5)}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition"
          >
            Snooze 5 min
          </button>
          <button
            onClick={() => onDismiss(todo._id!)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
