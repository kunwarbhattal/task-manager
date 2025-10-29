# 📝 To-Do List Web Application

A simple and clean **To-Do List app** built using **ASP.NET Core Web API** (backend) and **React** (frontend).  
It allows users to **add**, **view**, **mark complete**, and **delete** tasks — demonstrating a full CRUD workflow.

---

## 🚀 Features

✅ Create new tasks  
✅ Fetch and display tasks from the backend  
✅ Mark tasks as completed/incomplete  
✅ Delete tasks  
✅ Persistent backend using ASP.NET Core  
✅ Modern responsive UI built with React  
✅ Clean separation between frontend and backend  

---

## 🧰 Tech Stack

### **Frontend**
- React (TypeScript)
- Axios for API calls
- CSS for styling (no Tailwind)

### **Backend**
- ASP.NET Core Web API
- C#
- Entity Framework (optional for persistence)
- JSON data storage (for simple demo)

---

## 🚀 Quick Start Guide

### 🖥️ Prerequisites

Before you begin, make sure you have the following installed:

- **.NET SDK 8.0 or later** → [Download .NET SDK](https://dotnet.microsoft.com/download)
- **Node.js v18+** → [Download Node.js](https://nodejs.org/)
- **Visual Studio Code** or **Visual Studio 2022**
- **Postman** (optional, for API testing)

---

## ⚙️ Backend Setup (ASP.NET Core)

1. Navigate to your backend directory:
   ```bash
   cd backend
   ```
2. Run the application
   ```bash
   dotnet run
   ```
3. The API should now be live at:
   ```link
   http://localhost:5013

4. Test the endpoints using Postman or a browser:
  GET → /api/tasks

  POST → /api/tasks

  PUT → /api/tasks/{id}
  
  DELETE → /api/tasks/{id}

##💻 Frontend Setup (React + Vite)

Navigate to your frontend folder:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Run the React app:
```bash
npm run dev
```

| Method   | Endpoint          | Description                    |
| -------- | ----------------- | ------------------------------ |
| `GET`    | `/api/tasks`      | Fetch all tasks                |
| `POST`   | `/api/tasks`      | Add a new task                 |
| `PUT`    | `/api/tasks/{id}` | Update or mark a task complete |
| `DELETE` | `/api/tasks/{id}` | Delete a task                  |

Example JSON for POST request:
```json
{
  "description": "Complete frontend integration",
  "isCompleted": false
}
```
## 💡 Future Improvements

✅ Task search/filter functionality

🗂️ Archive completed tasks

💾 Persistent storage (SQLite / PostgreSQL)

🌙 Dark mode UI

🔐 User authentication
