import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as apiLogin, register as apiRegister } from "../api/Index";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("auth_user");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Intentar login primero
      try {
        const response = await apiLogin(username, password);
        const { token, user: userData } = response;
        
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(userData));
        setUser(userData);
        toast.success(`Welcome ${userData.username}`);
        navigate("/");
        return;
      } catch (loginError) {
        // Si el login falla, intentar registro
        if (loginError.response?.status === 401) {
          const response = await apiRegister(username, password);
          const { token, user: userData } = response;
          
          localStorage.setItem("auth_token", token);
          localStorage.setItem("auth_user", JSON.stringify(userData));
          setUser(userData);
          toast.success(`User created: ${userData.username}`);
          navigate("/");
          return;
        }
        throw loginError;
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = error.response?.data?.error || "Error during authentication";
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    toast.info("Session closed");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
