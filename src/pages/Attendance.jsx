import DashboardLayout from "../components/DashboardLayout";

export default function Attendance() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📆 Attendance</h2>

        <table className="w-full text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-red-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">Present Days</th>
              <th className="p-3">Total Days</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {["January", "February", "March", "April"].map((month) => (
              <tr key={month} className="border-t">
                <td className="p-3">{month}</td>
                <td className="p-3">18</td>
                <td className="p-3">22</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
