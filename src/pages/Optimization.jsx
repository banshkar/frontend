import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Optimization() {
  const [metrics, setMetrics] = useState({
    fuelUse: 0,
    efficiency: 0,
    vibration: 0,
    kilnTemp: 0,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        fuelUse: (Math.random() * 300).toFixed(1), // liters/hour
        efficiency: (80 + Math.random() * 20).toFixed(1), // %
        vibration: (Math.random() * 10).toFixed(1), // mm/s
        kilnTemp: (1000 + Math.random() * 500).toFixed(1), // °C
        time: new Date().toLocaleTimeString(),
      };

      setMetrics(newData);
      setHistory((prev) => [...prev.slice(-19), newData]); // last 20 readings
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSuggestions = () => {
    const suggestions = [];
    if (metrics.kilnTemp > 1200) {
      suggestions.push("Kiln running hot: consider adjusting fuel feed.");
    }
    if (metrics.vibration > 7) {
      suggestions.push("High vibration: schedule motor alignment check.");
    }
    if (metrics.efficiency < 85) {
      suggestions.push("Efficiency low: optimize raw mix feed ratio.");
    }
    if (suggestions.length === 0) {
      suggestions.push("Plant running optimally.");
    }
    return suggestions;
  };

  return (
    <div className="container mx-auto p-8 text-gray-100">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-purple-400">
        Cement Plant Optimization
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Fuel Use" value={`${metrics.fuelUse} L/h`} color="text-yellow-400" />
        <KpiCard title="Efficiency" value={`${metrics.efficiency} %`} color="text-green-400" />
        <KpiCard title="Motor Vibration" value={`${metrics.vibration} mm/s`} color="text-red-400" />
        <KpiCard title="Kiln Temp" value={`${metrics.kilnTemp} °C`} color="text-orange-400" />
      </div>

      {/* Energy Trend */}
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Fuel Use Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="fuelUse" stroke="#facc15" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Suggestions */}
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Optimization Suggestions</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {getSuggestions().map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Reusable KPI card component
function KpiCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-2xl p-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
