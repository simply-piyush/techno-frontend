import React from "react";
import DashboardLayout from "../components/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">📢 Notice Board</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Semester exams begin from May 10th.</li>
        <li>Submit assignments by April 28th.</li>
        <li>Library books due on April 30th.</li>
        <li>MAKAUT portal open for registration.</li>
      </ul>
    </DashboardLayout>
  );
};

export default Home;
