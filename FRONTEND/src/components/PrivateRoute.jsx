import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-primary"></div>
        <p className="mt-4 text-white text-lg">Cargando...</p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}
