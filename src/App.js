import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FullDetails from "./pages/FullDetails";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<FullDetails />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
