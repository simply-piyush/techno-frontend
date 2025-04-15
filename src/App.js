// src/App.js
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>📚 Techno Admin</h2>
        <nav>
          <ul>
            <li className="active">📊 Student Sheet</li>
            <li>📝 Classwork (coming soon)</li>
            <li>📢 Notices (coming soon)</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>📄 Embedded Student Database Sheet</h1>
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTMfXpZoVB_QUvmWJZjRhuElrcy5zpfjhR-Ij_Sq58JsitVK0MhXsXid9L-Nxc4nRZalKLZMN2lanIP/edit?usp=sharing"
          width="100%"
          height="600"
          frameBorder="0"
          title="Google Sheet"
        ></iframe>
      </main>
    </div>
  );
}

export default App;
