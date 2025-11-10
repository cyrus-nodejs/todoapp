import React from 'react';

interface Props {
  deadline: string;
  reminder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labels?: { deadline?: string; reminder?: string };
}

export default function DateInputs({ deadline, reminder, onChange, labels }: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {labels?.deadline || 'Deadline'}
        </label>
        <input
          type="datetime-local"
          name="deadline"
          value={deadline}
          onChange={onChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {labels?.reminder || 'Reminder'}
        </label>
        <input
          type="datetime-local"
          name="reminder"
          value={reminder}
          onChange={onChange}
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  );
}
