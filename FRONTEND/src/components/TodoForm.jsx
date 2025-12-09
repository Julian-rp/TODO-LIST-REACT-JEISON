import { useState } from "react";

export default function TodoForm({ onAdd, disabled }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-black mb-4">➕ Nueva Tarea</h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="w-full border-2 border-gray-300 px-5 py-4 rounded-xl bg-white text-black text-base placeholder-gray-400 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-sm"
          placeholder=" Escribe una nueva tarea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
        />
        <button
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl font-bold text-lg shadow-xl hover:from-blue-900 hover:to-blue-950 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={disabled}
        >
          ➕ AGREGAR TAREA
        </button>
      </form>
    </div>
  );
}
