import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddTask({ description: message });
    setMessage("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
