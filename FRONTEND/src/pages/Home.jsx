import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/Index.jsx";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Cargar tareas al iniciar
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => toast.error("Error cargando tareas"))
      .finally(() => setLoading(false));
  }, []);

  // Crear nueva tarea
  const handleAdd = async (text) => {
    try {
      const newTask = { text };
      const created = await createTask(newTask);
      setTasks((prev) => [created, ...prev]);
      toast.success("Tarea creada");
    } catch (error) {
      console.error("Error creando tarea:", error);
      toast.error("Error creando tarea");
    }
  };

  // Marcar completada/pendiente
  const handleToggle = async (id, completed) => {
    try {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;

      const updatedTask = { ...current, completed };
      const updated = await updateTask(id, updatedTask);

      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      toast.error("Error actualizando tarea");
    }
  };

  // Eliminar tarea
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.info("Tarea eliminada");
    } catch {
      toast.error("Error eliminando tarea");
    }
  };

  // Editar tarea
  const handleEdit = async (id, newText) => {
    try {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;

      const updatedTask = {
        text: newText,
      };

      const updated = await updateTask(id, updatedTask);

      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Tarea editada");
    } catch {
      toast.error("Error editando tarea");
    }
  };

  // Filtrado
  const filtered = tasks.filter((t) => {
    const matchesQuery = `${t.author} ${t.text}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 p-5 bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            ✅ Team To-Do
          </h1>
          {user && (
            <div className="flex gap-4 items-center">
              <span className="text-white font-semibold bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-white/30">
                👤 {user.username || user.name}
              </span>
              <button
                onClick={logout}
                className="px-6 py-3 bg-white text-blue-800 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all transform hover:scale-110 hover:rotate-1 active:scale-95 shadow-2xl border-4 border-white/50 flex items-center justify-center whitespace-nowrap"
                title="Cerrar sesión"
              >
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </header>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Search and Form */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-xl border-2 border-gray-200">
              <SearchBar
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-xl border-2 border-gray-200">
              <TodoForm onAdd={handleAdd} />
            </div>
          </div>

          {/* Right Side - Tasks List */}
          <div className="lg:w-2/3">
            <main className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-2 border-gray-200 min-h-[500px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
                  <p className="text-black font-bold text-xl">Cargando tareas...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="text-8xl mb-6">📝</div>
                  <p className="text-2xl font-bold text-black mb-3">No se encontraron tareas</p>
                  <p className="text-gray-600 text-lg">Crea una nueva tarea para comenzar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mb-6 pb-4 border-b-2 border-gray-200">
                    <h2 className="text-2xl font-bold text-black">
                      📋 Tareas ({filtered.length})
                    </h2>
                  </div>
                  <TodoList
                    tasks={filtered}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
