import  { useEffect, useState } from 'react';
import type { Todo } from '../types';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList';
import ReminderModal from '../components/ReminderModal';
import TodoDetailsModal from '../components/TodoDetailsModal';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [highlightedTodos, setHighlightedTodos] = useState<string[]>([]);
  const [currentReminder, setCurrentReminder] = useState<Todo | null>(null);
  const [snoozeMinutes, setSnoozeMinutes] = useState<number>(5);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  // Load all todos
  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res?.data);
    console.log('Yes',todos)
  };

  useEffect(() => {
    loadTodos();

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Poll for reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      todos.forEach((todo) => {
        if (todo.reminder && todo._id) {
          const reminderTime = new Date(todo.reminder).getTime();
          if (reminderTime <= now && reminderTime > now - 60000) {
            // Highlight the todo
            setHighlightedTodos((prev) => [...prev, todo._id!]);

            // Show modal for snooze/dismiss
            setCurrentReminder(todo);

            // Browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`Reminder: ${todo.title}`, {
                body: todo.description || 'You have a task due!',
              });
            }

            // Play reminder sound
            const audio = document.getElementById('reminder-audio') as HTMLAudioElement;
            if (audio) audio.play();

            // Remove highlight after 5 seconds
            setTimeout(() => {
              setHighlightedTodos((prev) => prev.filter((id) => id !== todo._id));
            }, 5000);
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  // Create or update todo
  const handleCreateOrUpdate = async (data: Partial<Todo>) => {
    if (editingTodo && editingTodo._id) {
      await updateTodo(editingTodo._id, data);
      setEditingTodo(null);
    } else {
      await createTodo(data);
    }
    loadTodos();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleEdit = (todo: Todo) => setEditingTodo(todo);
  const handleCancelEdit = () => setEditingTodo(null);

  // Snooze reminder and persist
  const handleSnooze = async (id: string) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    const newReminder = new Date(Date.now() + snoozeMinutes * 60 * 1000).toISOString();

    // Update locally
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, reminder: newReminder } : t))
    );

    // Persist to backend
    await updateTodo(id, { reminder: newReminder });
  };

  // Dismiss reminder
  const handleDismiss = (id: string) => {
    setHighlightedTodos((prev) => prev.filter((tid) => tid !== id));
    setCurrentReminder(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Manager</h1>

      {/* Snooze duration setting */}
      <div className="flex gap-2 items-center mb-4">
        <label className="text-gray-700">Snooze Duration (min):</label>
        <input
          type="number"
          value={snoozeMinutes}
          onChange={(e) => setSnoozeMinutes(Number(e.target.value))}
          min={1}
          max={30}
          className="p-2 border rounded w-20"
        />
      </div>

      {/* Todo form */}
      <TodoForm onSubmit={handleCreateOrUpdate} editingTodo={editingTodo} onCancel={handleCancelEdit} />

      {/* Todo list */}
      <TodoList
        todos={todos}
        onUpdate={updateTodo}
        onDelete={handleDelete}
        onEdit={handleEdit}
        highlightedTodos={highlightedTodos}
         onViewDetails={(id) => setSelectedTodoId(id)} // 👈 New handler
      />
    

      {/* Reminder modal */}
      <ReminderModal
        todo={currentReminder}
        snoozeMinutes={snoozeMinutes}
        onSnooze={handleSnooze}
        onDismiss={handleDismiss}
        onClose={() => setCurrentReminder(null)}
      />
      
      {/* Audio element */}
      <audio id="reminder-audio" src="/sounds/reminder.mp3" preload="auto" />

      <TodoDetailsModal
     todoId={selectedTodoId}
     onClose={() => setSelectedTodoId(null)}
     />
    </div>
  );
}
