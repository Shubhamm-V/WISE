import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/Dashboard";
import AddHospital from "./pages/hospitals/AddHospital";
import { useAuth } from "./context/authContext";
import DashLayout from "./layouts/DashLayout";
import Users from "./pages/Users";
import ViewHospitals from "./pages/hospitals/ViewHospitals";
import AllUserHospitals from "./pages/hospitals/AllUserHospitals";
import AddVideo from "./pages/videos/AddVideo";
import AllVideos from "./pages/videos/PostedVideos";

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
        <Route index element={<Navigate to={"add-hospital"} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="add-hospital" element={<AddHospital />} />
        <Route path="add-video" element={<AddVideo />} />
        <Route path="view-videos" element={<AllVideos />} />
        <Route path="view-hospitals" element={<ViewHospitals />} />
        <Route path="all-hospitals" element={<AllUserHospitals />} />
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
