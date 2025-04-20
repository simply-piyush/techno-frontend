import React from "react";

function StudentDashboard({ student }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome, {student.name}!</h1>
      <p>Roll: {student.roll}</p>
      <p>Email: {student.email}</p>
      <p>Phone: {student.phone}</p>
    </div>
  );
}

export default StudentDashboard;
