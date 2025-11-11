# 📝 Todo Application

A fullstack **Todo app** with reminders, deadlines, categories, and color-coded todos. Built with **React + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend. Supports **CRUD operations**, **reminder notifications**, and a **character-limited todo form**.

---

## 💻 Features

**Frontend (React + TypeScript + Tailwind CSS)**

* Create, read, update, and delete todos.
* Categories (General, Work, Personal, Shopping).
* Color picker for todo highlighting.
* Deadline and reminder inputs with validation.
* Character count feedback for title and description.
* Notification modal with snooze/dismiss functionality.
* Upcoming reminders panel for the next hour.

**Backend (Node.js + Express + TypeScript + MongoDB + Mongoose)**

* RESTful API endpoints for todos:

  * `POST /api/todos` → Create a new todo.
  * `GET /api/todos` → Get all todos.
  * `GET /api/todos/:id` → Get a single todo by ID.
  * `PUT /api/todos/:id` → Update a todo.
  * `DELETE /api/todos/:id` → Delete a todo.
* Integrated with MongoDB for persistence.
* API documentation via Swagger (`/api-docs`).

---

## 🛠 Technology Stack

**Backend:**

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* Swagger for API docs

**Frontend:**

* React + TypeScript
* Tailwind CSS
* Formik + Yup for form validation
* Axios for API calls

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todoapp
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create a `.env` file** with your MongoDB URI:

```
MONGO_URI=mongodb://localhost:27017/todo-app
PORT=5000
```

**Run backend in development mode:**

```bash
npm run dev
```

* Backend server runs on `http://localhost:4000`
* Swagger API docs available at `http://localhost:4000/api-docs`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Run frontend in development mode:**

```bash
npm start
```

* React app runs on `http://localhost:3000`
* Connects to backend API at `/api/todos` (proxy setup in `package.json`)

---

## 🗂 Project Structure

```
backend/
  ├─ src/
  │  ├─ controllers/       # REST API controllers
  │  ├─ models/            # Mongoose models
  │  ├─ routes/            # Express routes
  │  ├─ app.ts             # Express setup
  │  └─ server.ts          # Server entry point
frontend/
  ├─ src/
  │  ├─ components/        # React components (TodoForm, TodoList, DateInputs, etc.)
  │  ├─ hooks/             # Custom hooks (useReminderNotifications)
  │  ├─ api.ts             # Axios API calls
  │  ├─ types.ts           # TypeScript types
  │  └─ App.tsx
```

---

## ⚙️ Usage

1. Open the app in the browser (`http://localhost:3000`).
2. **Add a todo** with title, description, category, color, deadline, and optional reminder.
3. Todos will appear in the list.
4. **Edit or delete** todos using the buttons in the list.
5. Reminders trigger a **modal notification**, which you can **snooze or dismiss**.
6. **Upcoming reminders** are shown in the sidebar for the next hour.
7. Character counts guide you while typing in the form.

---

## 📦 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/todos`     | Create a new todo |
| GET    | `/api/todos`     | Get all todos     |
| GET    | `/api/todos/:id` | Get a todo by ID  |
| PUT    | `/api/todos/:id` | Update a todo     |
| DELETE | `/api/todos/:id` | Delete a todo     |

**Sample Todo JSON:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "Shopping",
  "color": "#facc15",
  "deadline": "2025-11-10T17:00",
  "reminder": "2025-11-10T16:00"
}
```

---

## 🛡 Validation Rules

* **Title:** Required, max 100 characters.
* **Description:** Max 500 characters.
* **Reminder:** Cannot be after deadline.

---

## 🎨 UI Features

* Tailwind CSS for modern, responsive design.
* Color picker shows current color visually.
* Deadline and reminder inputs with labels.
* Character count feedback for title and description.
* Reminder notification modal with snooze/dismiss.
* Upcoming reminders sidebar.

---

## 📝 Notes


* All date/time fields use **local datetime-local input**, so your browser timezone is considered.

---

## 🔧 Future Improvements

* Browser notifications for reminders (even when tab is inactive).
* Authentication for multiple users.
* Drag-and-drop reordering for todos.
* Dark mode toggle using Tailwind.

---

## 📄 License

MIT License © 2025 Your Name
