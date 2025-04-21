import React from "react";

const NoticeBoard = ({ notices = [], loading, error }) => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 whitespace-nowrap">
          📢 Notice Board
        </h2>
        <button
          onClick={() => window.location.reload()}
          title="Refresh"
          className="text-gray-500 hover:text-red-600 text-base sm:text-lg transition duration-200"
        >
          ⟳
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-gray-500 text-sm">Loading notices...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow text-sm">{error}</div>
      ) : notices.length === 0 ? (
        <div className="text-center text-gray-400 text-sm">No notices available.</div>
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
    </section>
  );
};

export default NoticeBoard;
