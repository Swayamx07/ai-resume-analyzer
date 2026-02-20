import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import Analyze from "./pages/Analyze";
import Jobs from "./pages/Jobs";


function App() {
  return (
    <div className="min-h-screen relative bg-[#020617] text-white overflow-hidden">

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* your routes render here */}
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/jobs" element={<Jobs />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;