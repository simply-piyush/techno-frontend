import React, { useState } from "react";

function CreateAccount({ goBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roll: "",
    dob: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { name, email, phone, roll, dob } = formData;
    if (!name || !email || !phone || !roll || !dob) {
      setError("Please fill all fields");
      return;
    }

    formData.password = dob;

    try {
      const res = await fetch(
        "https://techno-backend-76p3.onrender.com/api/students/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        setError("Failed to create account");
        return;
      }

      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Roll Number"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Date of Birth (DD-MM-YYYY)"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <div style={styles.error}>{error}</div>}
        {success && (
          <div style={styles.success}>Account created successfully!</div>
        )}

        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
        <p onClick={goBack} style={styles.link}>
          Back to Login
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
  success: {
    color: "green",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default CreateAccount;
