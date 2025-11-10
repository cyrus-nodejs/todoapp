import { Schema, model, Document } from 'mongoose';

export type ITodo = Document & {
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  color?: string; // hex
  deadline?: Date;
  reminder?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    category: { type: String },
    color: { type: String, default: '#2d1f7cff' },
    deadline: { type: Date },
    reminder: { type: Date }
  },
  { timestamps: true }
);

export const Todo = model<ITodo>('Todo', TodoSchema);