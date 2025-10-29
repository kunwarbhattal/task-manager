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

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data: Task[] = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask, isCompleted: false }),
    });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async (id: string, current: boolean, desc: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, description: desc, isCompleted: !current }),
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleComplete} />
    </div>
  );
}
