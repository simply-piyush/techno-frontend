import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://techno-backend-76p3.onrender.com/api/students/notices";

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch notices");
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">📢 Notice Board</h1>
          <button
            onClick={fetchNotices}
            className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded transition"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="text-gray-500">Loading notices...</div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded shadow-sm">
            <p>Error: {error}</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-400">No notices available.</div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    {notice.title}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {new Date(notice.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{notice.description}</p>
                {notice.fileURL && (
                  <a
                    href={notice.fileURL}
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

export default Home;
