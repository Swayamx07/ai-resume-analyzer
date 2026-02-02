import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
