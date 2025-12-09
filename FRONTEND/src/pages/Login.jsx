import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-br from-blue-800 to-blue-900 p-6 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-all">
            <h1 className="text-6xl mb-2">✅</h1>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 drop-shadow-lg">
            TODO LIST
          </h1>
          <p className="text-gray-700 text-xl font-medium">Gestiona tus tareas de forma colaborativa</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
