import { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import SuggestionCard from "./Suggestions";
import ChatBot from "./ChatBotPage";

export default function ControlRoom() {
  const [metrics, setMetrics] = useState({
    fuelUse: 0,
    efficiency: 0,
    vibration: 0,
    kilnTemp: 0,
    co2: 0,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        fuelUse: (Math.random() * 300).toFixed(1),
        efficiency: (80 + Math.random() * 20).toFixed(1),
        vibration: (Math.random() * 10).toFixed(1),
        kilnTemp: (1000 + Math.random() * 500).toFixed(1),
        co2: (300 + Math.random() * 200).toFixed(1),
        time: new Date().toLocaleTimeString(),
      };
      setMetrics(newData);
      setHistory(prev => [...prev.slice(-19), newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSuggestions = () => {
    const suggestions = [];
    if (metrics.kilnTemp > 1200)
      suggestions.push("🔥 Kiln running hot: adjust fuel feed.");
    if (metrics.vibration > 7)
      suggestions.push("⚙️ High vibration: check motor alignment.");
    if (metrics.efficiency < 85)
      suggestions.push("📉 Efficiency low: optimize raw mix.");
    if (metrics.co2 > 400)
      suggestions.push("🌱 CO₂ high: increase alternative fuel.");
    if (suggestions.length === 0) suggestions.push("✅ Plant running optimally.");
    return suggestions;
  };

  const getAIPredictions = () => {
    const predictions = [];
    if (metrics.kilnTemp > 1250)
      predictions.push("🤖 AI: Reduce kiln temp 2-3% to lower CO₂.");
    if (metrics.fuelUse > 250)
      predictions.push("🤖 AI: Optimize fuel mix for efficiency.");
    return predictions;
  };

  return (
    <div className="container mx-auto p-6 text-gray-100">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-400">
        Cement Plant Control Room
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <KpiCard title="Fuel Use" value={`${metrics.fuelUse} L/h`} color="text-yellow-400" />
        <KpiCard title="Efficiency" value={`${metrics.efficiency} %`} color="text-green-400" />
        <KpiCard title="Motor Vibration" value={`${metrics.vibration} mm/s`} color="text-red-400" />
        <KpiCard title="Kiln Temp" value={`${metrics.kilnTemp} °C`} color="text-orange-400" />
        <KpiCard title="CO₂ Emissions" value={`${metrics.co2} ppm`} color="text-blue-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Fuel Use Trend" dataKey="fuelUse" data={history} color="#facc15" />
        <ChartCard title="Kiln Temp & Efficiency" dataKey="kilnTemp" dataKey2="efficiency" data={history} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SuggestionCard title="Optimization Suggestions" suggestions={[...getSuggestions(), ...getAIPredictions()]} />
        <ChatBot />
      </div>
    </div>
  );
}
