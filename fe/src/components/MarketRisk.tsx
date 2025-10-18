export default function MarketRisk({ risk }: { risk: number }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl text-white">
      <h2 className="text-xl font-bold mb-4">Market Risk</h2>
      <div className="w-full bg-gray-600 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full ${risk > 60 ? "bg-red-500" : "bg-yellow-400"}`}
          style={{ width: `${risk}%` }}
        ></div>
      </div>
      <p>{risk}% chance of market correction</p>
    </div>
  );
}
