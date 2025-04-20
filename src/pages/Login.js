import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!roll || !password) {
      setError("Please enter both roll number and password.");
      return;
    }

    try {
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ roll, password })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid credentials. Please check your roll number and password.");
        } else {
          setError("Server error. Please try again later.");
        }
        return;
      }

      const student = await response.json();
      console.log("✅ Logged in student:", student);

      // Redirect or store in context/localStorage if needed
      navigate("/dashboard", { state: { student } });

    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Failed to connect to server. Please check your internet.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="University Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (DOB - DD-MM-YYYY)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p className="create-link" onClick={() => navigate("/create-account")}>
        Don't have an account? Create one
      </p>
    </div>
  );
}

export default Login;
