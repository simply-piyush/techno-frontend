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
        const raw = await res.text();

        if (!res.ok) {
          throw new Error("Server returned an error");
        }

        const data = JSON.parse(raw);

        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          throw new Error("Invalid notice data format");
        }

        setNotices(data);
      } catch (err) {
        console.error("Decoding error:", err);
        setError("Failed to load notices. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📢 Notice Board</h2>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading notices...</p>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded shadow">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-500">No notices available</div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
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

export default Dashboard;
