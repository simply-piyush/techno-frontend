import React, { useState } from "react";

function CreateAccount({ goBack }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", roll: "", dob: "", password: ""
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
      const res = await fetch("https://techno-backend.onrender.com/api/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
        {success && <div style={styles.success}>Account created successfully!</div>}

        <button onClick={handleSubmit} style={styles.button}>Submit</button>
        <p onClick={goBack} style={styles.link}>Back to Login</p>
      </div>
    </div>
  );
}

const styles = {
  ... // reuse styles from Login.js
};

export default CreateAccount;
