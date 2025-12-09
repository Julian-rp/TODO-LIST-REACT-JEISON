import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Autenticación
export const register = (username, password) =>
  api.post("/auth/register", { username, password }).then((r) => r.data);

export const login = (username, password) =>
  api.post("/auth/login", { username, password }).then((r) => r.data);

// Obtener todas las tareas
export const getTasks = () => api.get("/tasks").then((r) => r.data);

// Crear nueva tarea
export const createTask = (task) => api.post("/tasks", task).then((r) => r.data);

// Actualizar tarea
export const updateTask = (id, updatedTask) =>
  api.put(`/tasks/${id}`, updatedTask).then((r) => r.data);

// Eliminar tarea
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
