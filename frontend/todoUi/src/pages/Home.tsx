import { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList';
import ReminderModal from '../components/ReminderModal';
import UpcomingReminders from '../hooks/UpcomingReminders';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { useReminderNotifications } from '../hooks/useReminderNotifications';
import type { Todo } from '../types';

import type { ReminderNotification } from '../hooks/useReminderNotifications';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const {
    scheduleReminder,
    rescheduleTodos,
    active,
    dismissReminder,
    snoozeReminder,
    getUpcomingNextHour,
  } = useReminderNotifications();

  // Load all todos
  useEffect(() => {
    fetchTodos().then((res) => {
      setTodos(res.data);
      rescheduleTodos(res.data);
    });
  }, []);

  // Create
  const handleCreate = async (todoData: Partial<Todo>) => {
    const res = await createTodo(todoData);
    const newTodo = res.data;
    setTodos((prev) => [...prev, newTodo]);
    scheduleReminder(newTodo);
  };

  // Update
  const handleUpdate = async (id: string, todoData: Partial<Todo>) => {
    const res = await updateTodo(id, todoData);
    const updated = res.data;
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    scheduleReminder(updated);
  };

  // Delete
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  // View details
  const handleViewDetails = (id: string) => {
    const todo = todos.find((t) => t._id === id);
   if (todo) {
  let deadlineText = 'No deadline';
  if (todo.deadline) {
    const date = new Date(todo.deadline);
    deadlineText = date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  alert(`📋 ${todo.title}\n\n 📑 ${todo.description}\n\n⏱️ ${deadlineText}`);
}
  };

  // Upcoming reminders
  const upcoming: ReminderNotification[] = getUpcomingNextHour();

  return (
    <div className="max-w-2xl mx-auto py-10 relative">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App 📝</h1>

      {/* Todo Form */}
      <TodoForm
        onSubmit={editingTodo ? (data) => handleUpdate(editingTodo._id!, data) : handleCreate}
        editingTodo={editingTodo}
        onCancel={() => setEditingTodo(null)}
      />

      {/* Todo List */}
      <TodoList
        todos={todos}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onEdit={setEditingTodo}
        onViewDetails={handleViewDetails}
        highlightedTodos={[]}
      />

      {/* Reminder Modal */}
      {active && (
        <ReminderModal
          todo={active.todo}
          onDismiss={(id) => dismissReminder(id)}
          onSnooze={(id, minutes) => snoozeReminder(id, minutes)}
        />
      )}

      {/* Sidebar: Upcoming reminders */}
      <UpcomingReminders
        reminders={upcoming}
        onOpen={handleViewDetails}
        onSnooze={(id, minutes) => snoozeReminder(id, minutes)}
        onDismiss={(id) => dismissReminder(id)}
      />
    </div>
  );
}
