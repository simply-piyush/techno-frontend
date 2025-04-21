import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/notices");

        const data = await res.json();

        console.log("Notice API response:", data); // ✅ Add debug log

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch notices");
        }

        // ✅ Ensure data is an array
        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          throw new Error("Invalid data format");
        }

      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📢 Notice Board</h2>

        {loading ? (
          <p className="text-gray-500">Loading notices...</p>
        ) : error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-gray-400">No notices available.</div>
        ) : (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
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
