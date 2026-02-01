import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

function DashboardHome() {
  return <h2 className="text-2xl font-bold">Welcome to your AI Dashboard</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
