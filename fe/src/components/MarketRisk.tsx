"use client";

export default function MarketRisk() {
  const probability = 68; // hardcoded dummy data

  return (
    <div className="bg-white text-black rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-2">Market Risk</h2>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 transition-all"
          style={{ width: `${probability}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 text-lg font-semibold">
        {probability}% Risk
      </p>
    </div>
  );
}
