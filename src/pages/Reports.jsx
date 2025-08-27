// src/pages/Reports.jsx
import { useState } from "react";
import { Download, Calendar } from "lucide-react";

export default function Reports() {
  const [reports] = useState([
    { id: 1, title: "Energy Consumption - August 2025", date: "2025-08-25", type: "PDF" },
    { id: 2, title: "Kiln Performance Report", date: "2025-08-24", type: "Excel" },
    { id: 3, title: "CO2 Emissions Trend", date: "2025-08-22", type: "PDF" },
  ]);

  return (
    <div className="container mx-auto p-8 text-gray-100">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-cyan-400">
        Reports
      </h1>

      <div className="bg-gray-800 shadow-xl rounded-2xl p-6">
        <p className="text-lg text-center mb-6">
          Historical reports and data analysis for the cement plant.
        </p>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <input
              type="date"
              className="bg-gray-700 rounded-lg p-2 text-gray-200"
            />
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Filter
          </button>
        </div>

        {/* Report List */}
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">Report Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Type</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-700/40">
                <td className="py-3 px-4">{report.title}</td>
                <td className="py-3 px-4">{report.date}</td>
                <td className="py-3 px-4 text-center">{report.type}</td>
                <td className="py-3 px-4 text-center">
                  <button className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded-lg text-white">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Future features: downloadable reports, custom date ranges, and AI-powered summaries.
        </p>
      </div>
    </div>
  );
}
