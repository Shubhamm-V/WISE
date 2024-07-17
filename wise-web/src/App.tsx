import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Make sure to import Navigate
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import { useAuth } from "./context/authContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        index
        element={
          isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
