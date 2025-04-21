import React from "react";

const NoticeBoard = ({ notices = [], loading, error }) => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📢 Notice Board</h2>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-medium bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
        >
          ⟳ Refresh
        </button>
      </div>

      {/* States */}
      {loading ? (
        <div className="text-gray-500 text-sm">Loading notices...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow text-sm">{error}</div>
      ) : notices.length === 0 ? (
        <div className="text-center text-gray-400 text-sm">
          No notices available at the moment.
        </div>
      ) : (
        // Notice Cards
        <div className="grid gap-4">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
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
                  className="inline-flex items-center text-sm text-blue-600 hover:underline"
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
