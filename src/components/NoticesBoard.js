import React, { useEffect, useState } from "react";
import "./App.css";

export default function NoticesBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://techno-backend-76p3.onrender.com/api/notices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotices(data.notices);
      });
  }, []);

  return (
    <div className="notice-board-container">
      <h2>📋 All Notices</h2>
      {notices.map((notice) => (
        <div className="notice-item" key={notice._id}>
          <h3>{notice.title}</h3>
          <p>{notice.description}</p>
          {notice.fileType === "image" ? (
            <img src={notice.fileUrl} alt="Notice" className="notice-image" />
          ) : notice.fileType === "pdf" ? (
            <a href={notice.fileUrl} target="_blank" rel="noreferrer">
              <button>📄 View PDF</button>
            </a>
          ) : null}
          <p className="notice-date">🕒 {new Date(notice.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
