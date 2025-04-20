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

    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ roll, password: dob })
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      // You can save the user info or token here
      console.log("Login successful:", data);
      navigate("/dashboard", { state: { student: data } });
    } catch (err) {
      setError("Login failed. Please check your Student ID and DOB.");
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
