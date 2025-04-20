import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import StudentDashboard from "./StudentDashboard";

function Login() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState(null);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const login = async () => {
    try {
      const res = await fetch("https://techno-backend-76p3.onrender.com/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roll, password }),
      });

      if (!res.ok) {
        setError(res.status === 401 ? "Invalid credentials" : `Server error: ${res.status}`);
        return;
      }

      const data = await res.json();
      setStudent(data);
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  };

  if (creatingAccount) return <CreateAccount goBack={() => setCreatingAccount(false)} />;
  if (student) return <StudentDashboard student={student} />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="/collegeLogo.png" alt="logo" style={styles.logo} />
        <h2 style={styles.title}>Techno Student Portal</h2>

        <input
          type="text"
          placeholder="University Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password (DOB - DD-MM-YYYY)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button onClick={login} style={styles.button}>LOGIN</button>

        <p style={styles.link} onClick={() => setCreatingAccount(true)}>
          Don't have an account? Create one
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #cc0000, #b30000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
  },
  logo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: "4px solid white",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  title: {
    color: "#b30000",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#b30000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "12px",
  },
  link: {
    color: "#b30000",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default Login;
