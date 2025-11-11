import type { ReminderNotification } from '../hooks/useReminderNotifications';

interface Props {
  reminders: ReminderNotification[];
  onOpen: (todoId: string) => void;
  onSnooze: (todoId: string, minutes: number) => void;
  onDismiss: (todoId: string) => void;
}

export default function UpcomingReminders({ reminders, onOpen, onSnooze, onDismiss }: Props) {
  if (reminders.length === 0) return null;

  return (
    <div className="fixed right-4 top-20 w-80 bg-white border rounded-xl shadow-lg p-4 z-40">
      <h3 className="font-semibold text-lg mb-2">⏰ Upcoming (next hour)</h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {reminders.map(({ todo, time }) => (
          <li
            key={todo._id}
            className="p-3 border rounded-md flex flex-col gap-1 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex justify-between">
              <span className="font-medium">{todo.title}</span>
              <span className="text-xs text-gray-500">
                {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => onOpen(todo._id!)}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Open
              </button>
              <button
                onClick={() => onSnooze(todo._id!, 5)} // id + minutes
                className="text-xs px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Snooze
              </button>
              <button
                onClick={() => onDismiss(todo._id!)}
                className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Dismiss
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
