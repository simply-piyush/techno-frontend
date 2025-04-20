import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-red-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-red-600 text-white px-4 py-3 shadow relative">
        <div className="flex items-center">
          <button
            className="text-white text-2xl mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-[56px] left-0 w-64 h-full bg-white shadow-md z-20 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 p-4 text-gray-700">
          <div className="px-3 py-2 rounded bg-red-100 font-semibold">🏠 Notice Board</div>
          {[
            "📝 Full Details",
            "📊 Marks",
            "💰 Fees",
            "📆 Attendance",
            "📖 Syllabus",
            "🏛️ Library",
            "🌐 MAKAUT Website",
            "🖼️ Gallery",
          ].map((item, index) => (
            <div
              key={index}
              className="px-3 py-2 rounded hover:bg-red-100 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`pt-6 px-6 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
