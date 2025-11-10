// import { useEffect, useRef, useState } from 'react';
// import type { Todo } from '../types';

// export interface ReminderNotification {
//   todo: Todo;
//   time: number; // timestamp
// }

// export function useReminderNotifications() {
//   const [upcoming, setUpcoming] = useState<ReminderNotification[]>([]);
//   const [active, setActive] = useState<ReminderNotification | null>(null);
//   const timers = useRef<NodeJS.Timeout[]>([]);

//   // 🧹 Cleanup timers on unmount
//   useEffect(() => {
//     return () => timers.current.forEach((t) => clearTimeout(t));
//   }, []);

//   // 🕐 Schedule new reminder
//   const scheduleReminder = (todo: Todo) => {
//     if (!todo.reminder) return;

//     const reminderTime = new Date(todo.reminder).getTime();
//     const now = Date.now();
//     const delay = reminderTime - now;

//     if (delay <= 0) return; // skip past reminders

//     const timer = setTimeout(() => {
//       setActive({ todo, time: reminderTime });
//     }, delay);

//     timers.current.push(timer);
//     setUpcoming((prev) => [...prev, { todo, time: reminderTime }]);
//   };

//   const dismissReminder = () => setActive(null);

//   const snoozeReminder = (minutes: number) => {
//     if (!active) return;
//     const snoozeTime = Date.now() + minutes * 60 * 1000;
//     const timer = setTimeout(() => setActive(active), minutes * 60 * 1000);
//     timers.current.push(timer);
//     setActive(null);
//   };

//   return { scheduleReminder, active, dismissReminder, snoozeReminder };
// }
