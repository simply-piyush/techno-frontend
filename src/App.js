// src/App.js
import React from "react";
import "./App.css";
import NoticesForm from "./components/NoticesForm";
import NoticesBoard from "./components/NoticesBoard";

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>📚 Techno Admin</h2>
        <nav>
          <ul>
            <li className="active">📊 Student Sheet</li>
            <li>📝 Classwork (coming soon)</li>
            <li>📢 Notices</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>📄 Student Database Sheet</h1>

        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTMfXpZoVB_QUvmWJZjRhuElrcy5zpfjhR-Ij_Sq58JsitVK0MhXsXid9L-Nxc4nRZalKLZMN2lanIP/pubhtml?widget=true&amp;headers=false"
          width="100%"
          height="600"
          frameBorder="0"
          title="Google Sheet"
        ></iframe>

        <hr style={{ margin: "2rem 0" }} />

        <NoticesForm />
        <NoticesBoard />
      </main>
    </div>
  );
}

export default App;
