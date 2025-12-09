import { useState } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    if (!newText.trim()) return;
    onEdit(task.id, newText.trim());
    setIsEditing(false);
  };

  return (
    <li className={`flex flex-col gap-4 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 ${
      task.completed 
        ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-300" 
        : "bg-white border-gray-300"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
            className="w-6 h-6 mt-1 text-blue-800 border-gray-400 rounded focus:ring-2 focus:ring-blue-700 cursor-pointer flex-shrink-0"
          />
          {isEditing ? (
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
              onBlur={saveEdit}
              className="flex-1 border-2 border-blue-700 px-4 py-2.5 rounded-xl bg-white text-black text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              autoFocus
            />
          ) : (
            <div className="flex-1">
              <div
                className={`font-bold text-xl break-words mb-2 ${
                  task.completed 
                    ? "line-through text-gray-500" 
                    : "text-black"
                }`}
              >
                {task.text}
              </div>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
                <span className="font-semibold text-black">👤 {task.author}</span>
                {task.editor && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-semibold text-black">✏️ {task.editor}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {isEditing ? (
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-sm shadow-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95"
              onClick={saveEdit}
            >
              ✅ Guardar
            </button>
          ) : (
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-xl font-bold text-sm shadow-lg hover:from-blue-900 hover:to-blue-950 transition-all transform hover:scale-105 active:scale-95"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Editar
            </button>
          )}
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-sm shadow-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95"
            onClick={() => onDelete(task.id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
