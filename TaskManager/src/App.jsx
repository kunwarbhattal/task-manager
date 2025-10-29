import React, { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  }

  async function handleAddTask(task) {
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}
