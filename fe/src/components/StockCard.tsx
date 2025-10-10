export default function StockCard({
  ticker,
  marketPrice,
  intrinsicValue,
}: {
  ticker: string;
  marketPrice: number;
  intrinsicValue: number;
}) {
  const diffPercent = (((intrinsicValue - marketPrice) / marketPrice) * 100).toFixed(2);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-2">{ticker}</h2>
      <p>Market Price: ${marketPrice}</p>
      <p>Intrinsic Value: ${intrinsicValue}</p>
      <p className={`font-semibold ${diffPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
        {diffPercent >= 0 ? "+" : ""}
        {diffPercent}% {diffPercent >= 0 ? "Undervalued" : "Overvalued"}
      </p>
    </div>
  );
}
