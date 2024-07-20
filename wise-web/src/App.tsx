import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AddHospital from "./pages/hospitals/AddHospital";
import { useAuth } from "./context/authContext";
import DashLayout from "./layouts/DashLayout";
import Users from "./pages/Users";
import ViewHospitals from "./pages/hospitals/ViewHospitals";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          isAuthenticated ? <DashLayoutWithAuth /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Users />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="add-hospital" element={<AddHospital />} />
        <Route path="view-hospitals" element={<ViewHospitals />} />
      </Route>
    </Routes>
  );
}

function DashLayoutWithAuth() {
  return (
    <DashLayout>
      <Outlet />
    </DashLayout>
  );
}

export default App;
