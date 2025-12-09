import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  const debounced = useDebounce(query, 400);

  const filterOptions = [
    { value: "all", label: "Todo" },
    { value: "pending", label: "Pendiente" },
    { value: "completed", label: "Completado" }
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-black mb-4">🔍 Buscar y Filtrar</h3>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            className="w-full border-2 border-gray-300 px-5 py-3.5 rounded-xl bg-white text-black text-base placeholder-gray-400 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-sm"
            placeholder="🔍 Buscar tareas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Filtros:</label>
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:scale-105 active:scale-95 flex-1 min-w-[100px] ${
                  filter === option.value
                    ? "bg-gradient-to-r from-blue-800 to-blue-900 text-white border-2 border-blue-800 shadow-lg"
                    : "bg-white text-black border-2 border-gray-300 hover:border-blue-700 hover:bg-blue-100"
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
