import React, { useState } from "react";
import StudentTable from "../components/StudentsTable";
import CreateNotice from "../components/NoticesForm";
import AdminNoticeBoard from "../components/NoticesBoard";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("students");

  const renderPage = () => {
    switch (activePage) {
      case "students":
        return <StudentTable />;
      case "createNotice":
        return <CreateNotice />;
      case "notices":
        return <AdminNoticeBoard />;
      default:
        return <StudentTable />;
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activePage === "students" ? "active" : ""}
            onClick={() => setActivePage("students")}
          >
            Student Table
          </li>
          <li
            className={activePage === "createNotice" ? "active" : ""}
            onClick={() => setActivePage("createNotice")}
          >
            Create Notice
          </li>
          <li
            className={activePage === "notices" ? "active" : ""}
            onClick={() => setActivePage("notices")}
          >
            Notice Board
          </li>
        </ul>
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminDashboard;
