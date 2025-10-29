import React from "react";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string, current: boolean, desc: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return <p className="empty-text">No tasks yet. Add some!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.isCompleted ? "completed" : ""}`}
        >
          <span
            onClick={() =>
              onToggle(task.id, task.isCompleted, task.description)
            }
          >
            {task.description}
          </span>
          <button onClick={() => onDelete(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
