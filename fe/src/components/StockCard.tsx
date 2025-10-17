export default function StockCard({
  ticker,
  marketPrice,
  intrinsicValue,
}: {
  ticker: string;
  marketPrice: number;
  intrinsicValue: number;
}) {
  const diffPercent = ((intrinsicValue - marketPrice) / marketPrice) * 100;
  

  const marketPriceRounded = Number(marketPrice.toFixed(2));
  const intrinsicValueRounded = Number(intrinsicValue.toFixed(2));
  const diffPercentRounded = Number(diffPercent.toFixed(2));

    // Determine condition
  const isUndervalued = diffPercentRounded >= 0;

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-2">{ticker}</h2>
      <p>Market Price: ${marketPriceRounded}</p>
      <p>Intrinsic Value: ${intrinsicValueRounded}</p>

       <p className={`font-semibold ${isUndervalued ? "text-green-400" : "text-red-400"}`}>
        {isUndervalued ? "+" : ""}
        {diffPercentRounded}% {isUndervalued ? "Undervalued" : "Overvalued"}
      </p>
    </div>
  );
}
