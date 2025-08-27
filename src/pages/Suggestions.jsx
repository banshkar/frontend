export default function Suggestions({ metrics }) {
  const getSuggestions = () => {
    const suggestions = [];
    if (metrics.kilnTemp > 1200)
      suggestions.push("Kiln running hot: adjust fuel feed.");
    if (metrics.vibration > 7)
      suggestions.push(" High vibration: check motor alignment.");
    if (metrics.efficiency < 85)
      suggestions.push("Efficiency low: optimize raw mix.");
    if (metrics.co2 > 400)
      suggestions.push("🌱 CO₂ high: increase alternative fuel.");
    if (suggestions.length === 0) suggestions.push(" Plant running optimally.");
    return suggestions;
  };

  return (
    <div className="container mx-auto p-6 text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-purple-400">Operator Suggestions</h1>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        {getSuggestions().map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
