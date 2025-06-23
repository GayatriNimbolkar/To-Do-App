const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = () => fetch(`${API_URL}/get`).then(res => res.json());

export const addTask = (task) =>
  fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  }).then(res => res.json());

export const toggleTask = (id) =>
  fetch(`${API_URL}/edit/${id}`, { method: 'PUT' }).then(res => res.json());

export const updateTask = (id, task) =>
  fetch(`${API_URL}/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  }).then(res => res.json());

export const deleteTask = (id) =>
  fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' }).then(res => res.json());
