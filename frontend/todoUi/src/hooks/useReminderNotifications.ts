import { useState, useEffect, useCallback } from 'react';
import type { Todo } from '../types';

export interface ReminderNotification {
  todo: Todo;
  time: number; // timestamp in ms
}

export function useReminderNotifications() {
  const [reminders, setReminders] = useState<ReminderNotification[]>([]);
  const [active, setActive] = useState<ReminderNotification | null>(null);

  // Schedule a new reminder
  const scheduleReminder = (todo: Todo) => {
    if (!todo.reminder) return;
    const time = new Date(todo.reminder).getTime();
    if (time <= Date.now()) return; // skip past reminders
    setReminders((prev) => [...prev, { todo, time }]);
  };

  // Reschedule multiple todos
  const rescheduleTodos = (todos: Todo[]) => {
    const newReminders = todos
      .filter((t) => t.reminder)
      .map((t) => ({ todo: t, time: new Date(t.reminder!).getTime() }))
      .filter((r) => r.time > Date.now());
    setReminders(newReminders);
  };

  // Dismiss reminder by id (optional)
  const dismissReminder = (id?: string) => {
    if (id) {
      setReminders((prev) => prev.filter((r) => r.todo._id !== id));
      if (active?.todo._id === id) setActive(null);
    } else {
      setActive(null);
    }
  };

  // Snooze reminder by id for X minutes
  const snoozeReminder = (id: string, minutes: number) => {
    setReminders((prev) => {
      const r = prev.find((r) => r.todo._id === id);
      if (!r) return prev;
      const newTime = Date.now() + minutes * 60_000;
      return [...prev.filter((x) => x.todo._id !== id), { todo: r.todo, time: newTime }];
    });
    if (active?.todo._id === id) setActive(null);
  };

  // Check for reminders every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const next = reminders.find((r) => r.time <= now);
      if (next) setActive(next);
    }, 1000);
    return () => clearInterval(interval);
  }, [reminders]);

  // Get upcoming reminders in next X ms (default 1 hour)
  const getUpcomingNextHour = useCallback(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    return reminders.filter((r) => r.time > now && r.time <= now + oneHour);
  }, [reminders]);

  return {
    reminders,
    active,
    scheduleReminder,
    rescheduleTodos,
    dismissReminder,
    snoozeReminder,
    getUpcomingNextHour,
  };
}
