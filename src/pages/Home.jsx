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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-red-700">📢 Notice Board</h2>
          <button
            onClick={fetchNotices}
            className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-600">Loading notices...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p>Error: {error}</p>
            <button
              onClick={fetchNotices}
              className="mt-2 text-sm underline hover:text-red-900"
            >
              Retry
            </button>
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-500">No notices available.</div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
                  <span className="text-sm text-gray-500">{new Date(notice.date).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm">{notice.description}</p>
                {notice.fileURL && (
                  <a
                    href={notice.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline text-sm mt-3"
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
