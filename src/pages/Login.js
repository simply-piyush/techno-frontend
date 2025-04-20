import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, dob }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in.");
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc98Gu9Cu8kioz3qcFNpOv4eZMGi2y1RAUIw&s"
        alt="Logo"
        className="logo"
      />
      <h2>Techno Student Portal</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
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
      <p className="link">
        <a href="#">Don't have an account? Create one</a>
      </p>
    </div>
  );
};

export default Login;
