import  { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Todo } from '../../types';
import CategorySelect from './CategorySelect';
import ColorPicker from './ColorPicker';
import DateInputs from './DateInputs';

interface Props {
  onSubmit: (todo: Partial<Todo>) => void;
  editingTodo?: Todo | null;
  onCancel?: () => void;
}

export default function TodoForm({ onSubmit, editingTodo = null, onCancel }: Props) {
  const formik = useFormik<Partial<Todo>>({
    initialValues: {
      title: '',
      description: '',
      category: 'General',
      color: '#ffffff',
      deadline: '',
      reminder: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
      description: Yup.string()
        .max(500, 'Description cannot exceed 500 characters'),
      reminder: Yup.date()
        .nullable()
        .test('reminder-before-deadline', 'Reminder cannot be after deadline', function (value) {
          const { deadline } = this.parent;
          return !value || !deadline || new Date(value) <= new Date(deadline);
        }),
      deadline: Yup.date().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  // 🟡 Prefill when editing
  useEffect(() => {
    if (editingTodo) {
      formik.setValues({
        title: editingTodo.title || '',
        description: editingTodo.description || '',
        category: editingTodo.category || 'General',
        color: editingTodo.color || '#ffffff',
        deadline: editingTodo.deadline ? editingTodo.deadline.slice(0, 16) : '',
        reminder: editingTodo.reminder ? editingTodo.reminder.slice(0, 16) : '',
      });
    }
  }, [editingTodo]);

  // Character counts
  const titleCharCount = formik.values.title?.length || 0;
  const descCharCount = formik.values.description?.length || 0;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`p-4 rounded shadow mb-6 space-y-3 transition-colors ${
        editingTodo ? 'bg-yellow-50 border border-yellow-300' : 'bg-white'
      }`}
    >
      {/* 🏷 Title */}
      <div>
        <label className="block font-medium mb-1">
          Title <span className="text-sm text-gray-500">({titleCharCount}/100 words)</span>
        </label>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Enter title"
          className="p-2 border rounded w-full"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
        )}
      </div>

      {/* 📝 Description */}
      <div>
        <label className="block font-medium mb-1">
          Description <span className="text-sm text-gray-500">({descCharCount}/500 words)</span>
        </label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Enter details about your task"
          className="p-2 border rounded w-full"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
        )}
      </div>

      {/* 🧩 Category + Color */}
      <div className="flex gap-2 items-center">
        <CategorySelect value={formik.values.category || 'General'} onChange={formik.handleChange} />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Color:</label>
          <ColorPicker value={formik.values.color || '#ffffff'} onChange={formik.handleChange} />
          <div
            className="w-6 h-6 border rounded"
            style={{ backgroundColor: formik.values.color }}
            title="Current color"
          />
        </div>
      </div>

      {/* 📅 Date Inputs with labels */}
      <DateInputs
        deadline={formik.values.deadline || ''}
        reminder={formik.values.reminder || ''}
        onChange={formik.handleChange}
        labels={{ deadline: 'Deadline', reminder: 'Reminder' }}
      />

      {formik.errors.reminder && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.reminder}</p>
      )}

      {/* ✅ Buttons */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        {editingTodo && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
