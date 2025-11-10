export interface TodoDTO {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  category?: string;
  color?: string;
  deadline?: string | null;
  reminder?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  color?: string;
  deadline?: string;
  reminder?: string;
  completed?: boolean;
}
