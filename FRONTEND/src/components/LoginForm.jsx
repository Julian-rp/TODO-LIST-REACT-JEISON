import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;
    login(name.trim(), password.trim());
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-2xl border-2 border-gray-200">
      <div className="flex flex-col gap-3">
        <label className="text-black font-bold text-lg"> Usuario</label>
        <input
          className="border-2 border-gray-300 px-5 py-4 rounded-xl bg-white text-black text-lg placeholder-gray-400 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-sm"
          placeholder="Ingresa tu usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-black font-bold text-lg"> Contraseña</label>
        <input
          type="password"
          className="border-2 border-gray-300 px-5 py-4 rounded-xl bg-white text-black text-lg placeholder-gray-400 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-sm"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-gradient-to-r from-blue-800 to-blue-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:from-blue-900 hover:to-blue-950 transition-all transform hover:scale-105 active:scale-95"
      >
         INICIAR SESIÓN / REGISTRARSE
      </button>
      <p className="text-sm text-gray-600 text-center mt-2 font-medium">
         Si no tienes cuenta, se creará automáticamente
      </p>
    </form>
  );
}
