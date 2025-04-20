import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <div className="navbar">
        <button className="dropdown-btn" onClick={toggleSidebar}>☰</button>
        <h2>My College</h2>
      </div>

      <div id="sidebar" className={`sidebar ${sidebarVisible ? "show" : ""}`}>
        <div>🏠 Home</div>
        <div>📝 Full Details</div>
        <div>📊 Marks</div>
        <div>💰 Fees</div>
        <div>📆 Attendance</div>
        <div>📖 Syllabus</div>
        <div>🏛️ Library</div>
        <div>🌐 MAKAUT Website</div>
        <div>🖼️ Gallery</div>
      </div>

      <div className={`content ${sidebarVisible ? "with-sidebar" : ""}`}>
        <h3>Dashboard</h3>
        <p>This is the first content section.</p>
      </div>
    </div>
  );
};

export default Dashboard;
