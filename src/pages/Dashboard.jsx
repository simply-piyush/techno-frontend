import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = "https://techno-backend-76p3.onrender.com/api/students/notices";

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(apiUrl);
        const json = await res.json();

        console.log("API response:", json);

        if (!res.ok || !json.success || !Array.isArray(json.data)) {
          throw new Error("Invalid notice format");
        }

        setNotices(json.data);
      } catch (err) {
        console.error("Notice fetch error:", err);
        setError("Failed to load notices. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 whitespace-nowrap">
            📢 Notice Board
          </h2>
          <button
            onClick={() => window.location.reload()}
            title="Refresh"
            className="flex items-center justify-center w-7 h-7 text-xs text-gray-600 bg-gray-100 rounded hover:bg-red-100 hover:text-red-600 transition"
          >
            ⟳
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading notices...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded shadow text-sm">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">No notices available</div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-medium text-gray-900">{notice.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(notice.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{notice.description}</p>
                {notice.fileUrl && (
                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    📎 View Attachment
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
