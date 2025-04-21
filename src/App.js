import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FullDetails from "./pages/FullDetails";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard"; // ✅ student dashboard
import AdminDashboard from "./pages/AdminDashboard"; // ✅ admin dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* 👤 student */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* 🛠️ admin */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/details" element={<FullDetails />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
