import React, { useState } from "react";
import "../App.css";

export default function NoticesForm() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (file) data.append("file", file);

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/notices", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setMessage("✅ Notice posted!");
        setForm({ title: "", description: "" });
        setFile(null);
      } else {
        setMessage("❌ Failed to post notice");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error posting notice");
    }
  };

  return (
    <div className="notice-form-container">
      <h2>📢 Post a New Notice</h2>
      <form onSubmit={handleSubmit} className="notice-form">
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload Notice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
