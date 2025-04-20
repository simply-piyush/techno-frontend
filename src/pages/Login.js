import React, { useState } from "react";
import "./login.css";

function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://techno-backend-76p3.onrender.com/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ roll, password })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
    </div>
  );
}

export default Login;
