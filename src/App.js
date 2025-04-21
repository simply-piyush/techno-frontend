import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Student dashboard (with Notice Board)
import AdminDashboard from "./pages/AdminDashboard";
import FullDetails from "./pages/FullDetails";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ student */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ admin */}
        <Route path="/details" element={<FullDetails />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
