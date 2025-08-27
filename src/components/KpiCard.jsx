export default function KpiCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-2xl p-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
