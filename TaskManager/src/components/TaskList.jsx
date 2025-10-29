import React from "react";

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) return <p className="empty">No tasks yet.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.description}</span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
