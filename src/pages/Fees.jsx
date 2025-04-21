import DashboardLayout from "../components/DashboardLayout";

export default function Fees() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">💰 Fees</h2>

        <table className="w-full text-left border-collapse bg-white rounded shadow overflow-hidden">
          <thead className="bg-red-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3">Semester</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <tr key={sem} className="border-t">
                <td className="p-3">Semester {sem}</td>
                <td className="p-3">
                  <span className="text-green-600 font-medium">Paid</span>
                  {/* Change to red for unpaid */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
