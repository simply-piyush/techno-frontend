import React from "react";

const NoticeBoard = ({ notices = [], loading, error }) => {
  return (
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

      {loading ? (
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
  );
};

export default NoticeBoard;
