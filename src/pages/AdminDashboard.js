import React from "react";
import { useLocation } from "react-router-dom";

function AdminDashboard() {
  const { state } = useLocation();
  const admin = state?.user;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome Admin</h1>
      <p>Logged in as: {admin?.username}</p>

      <div style={{ marginTop: "30px" }}>
        <button style={btnStyle}>View Students</button>
        <button style={btnStyle}>Post Notices</button>
        <button style={btnStyle}>Logout</button>
      </div>
    </div>
  );
}

const btnStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#b30000",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminDashboard;
