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
import AddBooklet from "./pages/booklets/AddBooklet";
import PostedBooklets from "./pages/booklets/PostedBooklets";

function App() {
  const { isAuthenticated, user, isAdminVerified, setIsAdminVerified } =
    useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <DashLayoutWithAuth
              userId={user.userId}
              isAdminVerified={isAdminVerified}
              setIsAdminVerified={setIsAdminVerified}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Default route for non-admin users */}
        <Route index element={<Navigate to="add-hospital" replace />} />

        {/* Protected Routes */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="add-hospital" element={<AddHospital />} />
        <Route path="add-video" element={<AddVideo />} />
        <Route path="view-videos" element={<AllVideos />} />
        <Route path="view-hospitals" element={<ViewHospitals />} />
        <Route path="all-hospitals" element={<AllUserHospitals />} />
        <Route path="add-booklet" element={<AddBooklet />} />
        <Route path="view-booklets" element={<PostedBooklets />} />
      </Route>
    </Routes>
  );
}

function DashLayoutWithAuth({
  userId,
  isAdminVerified,
  setIsAdminVerified,
}: any) {
  if (userId === process.env.REACT_APP_ADMIN_ID && !isAdminVerified) {
    setIsAdminVerified(true);
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashLayout>
      <Outlet />
    </DashLayout>
  );
}

export default App;
