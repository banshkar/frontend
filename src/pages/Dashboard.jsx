// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChatBotPopup from "./ChatBotPage";

export default function Dashboard() {
  const [data, setData] = useState({
    kilnTemp: 0,
    motorLoad: 0,
    feederRate: 0,
    emissions: 0,
    weatherTemp: 0,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        kilnTemp: parseFloat((Math.random() * 1400).toFixed(1)),
        motorLoad: parseFloat((Math.random() * 100).toFixed(1)),
        feederRate: parseFloat((Math.random() * 500).toFixed(1)),
        emissions: parseFloat((Math.random() * 500).toFixed(1)),
        weatherTemp: parseFloat((Math.random() * 45).toFixed(1)),
        time: new Date().toLocaleTimeString(),
      };

      setData(newData);
      setHistory((prev) => [...prev.slice(-19), newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // --- Sustainability Data (static for now, can be dynamic later) ---
  const fuelData = [
    { name: "Coal", value: 82 },
    { name: "Alt. Fuels", value: 18 },
  ];
  const COLORS = ["#ef4444", "#22c55e"];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-400 tracking-wide">
        Cement Plant Live IoT Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-red-500">Kiln Temp</h2>
          <p className="text-3xl font-bold mt-1">{data.kilnTemp} °C</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-blue-500">Motor Load</h2>
          <p className="text-3xl font-bold mt-1">{data.motorLoad} %</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-green-500">Feeder Rate</h2>
          <p className="text-3xl font-bold mt-1">{data.feederRate} t/h</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-400">Emissions</h2>
          <p className="text-3xl font-bold mt-1">{data.emissions} ppm</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-yellow-500">Weather Temp</h2>
          <p className="text-3xl font-bold mt-1">{data.weatherTemp} °C</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ChartCard title="Kiln Temp Trend (°C)" data={history} dataKey="kilnTemp" color="#ef4444" max={1500} />
        <ChartCard title="Motor Load (%)" data={history} dataKey="motorLoad" color="#3b82f6" max={100} />
        <ChartCard title="Feeder Rate (t/h)" data={history} dataKey="feederRate" color="#22c55e" max={500} />
        <ChartCard title="Emissions (ppm)" data={history} dataKey="emissions" color="#9ca3af" max={500} />
        <ChartCard title="Weather Temperature (°C)" data={history} dataKey="weatherTemp" color="#eab308" max={50} />
      </div>

      {/* --- Sustainability Tracker --- */}
      <h2 className="text-xl font-bold text-green-400 mt-12 mb-6 text-center">
        Sustainability Tracker
      </h2>

      {/* Sustainability KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-300">Coal Usage</h2>
          <p className="text-3xl font-bold mt-1 text-red-400">82%</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-green-400">Alt. Fuel Usage</h2>
          <p className="text-3xl font-bold mt-1">18%</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-blue-400">TSR</h2>
          <p className="text-3xl font-bold mt-1">18%</p>
        </div>
        <div className="bg-gray-800 shadow-xl rounded-2xl p-4 text-center">
          <h2 className="text-lg font-semibold text-yellow-400">Target TSR</h2>
          <p className="text-3xl font-bold mt-1">25%</p>
        </div>
      </div>

      {/* Fuel Mix Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Fuel Mix (Coal vs. Alt. Fuels)">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fuelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {fuelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChatBotPopup />
      </div>
    </div>
  );
}
