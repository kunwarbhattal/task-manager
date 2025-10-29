const API_URL = "http://localhost:5013/api/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return await response.json();
}

export async function addTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to add task");
  return await response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
}
