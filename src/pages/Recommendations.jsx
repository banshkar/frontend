export default function Recommendations({ metrics }) {
  const getAIPredictions = () => {
    const predictions = [];
    if (metrics.kilnTemp > 1250)
      predictions.push("🤖 AI: Reduce kiln temp 2-3% to lower CO₂.");
    if (metrics.fuelUse > 250)
      predictions.push("🤖 AI: Optimize fuel mix for efficiency.");
    if (metrics.co2 > 400)
      predictions.push("🤖 AI: Increase alternative fuel to reduce CO₂ emissions.");
    return predictions;
  };

  return (
    <div className="container mx-auto p-6 text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-purple-400">AI Recommendations</h1>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        {getAIPredictions().map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
