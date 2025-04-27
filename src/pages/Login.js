import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "student") {
          navigate("/dashboard");
        } else {
          setError("Unknown user role.");
        }
      } else {
        setError("Invalid ID or Password.");
      }
    } catch (err) {
      console.error("Login error:", err);
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
            placeholder="Student/Admin ID"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Password (or DOB for students)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
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
