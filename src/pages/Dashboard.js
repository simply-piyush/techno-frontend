import React from "react";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  const [notices, setNotices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch("https://techno-backend-76p3.onrender.com/api/students/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch notices.");
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📢 Notice Board</h2>

        {loading ? (
          <p className="text-gray-500">Loading notices...</p>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-gray-500">No notices available.</div>
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
