import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

const API_URL = "http://localhost:5013/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // 🧠 Load from API + localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      fetchTasks();
    }
  }, []);

  // 💾 Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("⚠️ Using local data only (server unavailable)");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const newItem = { id: crypto.randomUUID(), description: newTask, isCompleted: false };

    setTasks((prev) => [...prev, newItem]);
    setNewTask("");

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
    } catch (err) {
      console.log("Offline mode: Task saved locally");
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch {
      console.log("Offline delete");
    }
  };

  const toggleComplete = async (id: string) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find((t) => t.id === id);
    if (updatedTask) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
      } catch {
        console.log("Offline toggle");
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div className="container mt-5 p-4 rounded shadow bg-light">
      <h1 className="text-center mb-4 fw-bold">📝 Task Manager</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="d-flex justify-content-center mb-3 gap-2">
        <button
          className={`btn btn-sm ${filter === "all" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${filter === "active" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${filter === "completed" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleComplete} />
    </div>
  );
}
