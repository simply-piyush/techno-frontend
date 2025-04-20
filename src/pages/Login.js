import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [roll, setRoll] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin shortcut check
    if (roll === "admin1" && dob === "admin1") {
      navigate("/admin-dashboard");
      return;
    }

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, password: dob })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/dashboard");
      } else {
        setError("Invalid Student ID or DOB.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc98Gu9Cu8kioz3qcFNpOv4eZMGi2y1RAUIw&s"
          alt="Logo"
          className="logo"
        />
        <h2>Techno Student Portal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student ID"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="link">
          <a href="/create-account">Don't have an account? Create one</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
