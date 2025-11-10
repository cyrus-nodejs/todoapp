import React from 'react';

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function CategorySelect({ value, onChange }: Props) {
  return (
    <select
      name="category"
      value={value}
      onChange={onChange}
      className="p-2 border rounded flex-1"
    >
      <option value="General">General</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Shopping">Shopping</option>
    </select>
  );
}
