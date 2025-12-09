import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer 
        position="top-right"
        toastClassName="bg-white border-2 border-blue-primary rounded-lg shadow-lg"
        progressClassName="bg-blue-primary"
        bodyClassName="text-gray-dark font-semibold"
      />
    </>
  );
}

export default App;
