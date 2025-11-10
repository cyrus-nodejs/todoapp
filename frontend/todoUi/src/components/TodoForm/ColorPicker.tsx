import React from 'react';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        name="color"
        value={value}
        onChange={onChange}
        className="w-12 h-12 p-0 border rounded"
      />
      <span className="text-sm text-gray-600">Pick color</span>
    </div>
  );
}
