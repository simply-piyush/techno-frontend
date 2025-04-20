import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../api/auth"; // abstracted API logic
import "./Login.css";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginStudent({ roll, password });
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Error logging in.");
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
          placeholder="University Roll No."
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
