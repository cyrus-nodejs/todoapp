import type { Todo } from '../types';


interface Props {
  todo: Todo | null;
  snoozeMinutes: number;
  onSnooze: (id: string) => void;
  onDismiss: (id: string) => void;
  onClose: () => void;
}

export default function ReminderModal({ todo, snoozeMinutes, onSnooze, onDismiss, onClose }: Props) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Reminder</h2>
        <p className="mb-2 font-semibold">{todo.title}</p>
        {todo.description && <p className="mb-4 text-gray-600">{todo.description}</p>}
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (todo._id) onSnooze(todo._id);
              onClose();
            }}
            className="px-4 py-2 bg-yellow-400 text-white rounded"
          >
            Snooze {snoozeMinutes} min
          </button>
          <button
            onClick={() => {
              if (todo._id) onDismiss(todo._id);
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
