// src/components/ChartCard.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({ title, data, dataKey, color, max }) {
  return (
    <div className="bg-gray-800 shadow-xl rounded-2xl p-6 transition-transform hover:scale-[1.02] duration-300">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#999" />
          <YAxis domain={[0, max]} stroke="#999" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            dot={{ stroke: color, strokeWidth: 1.5, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
