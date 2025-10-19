export default function AboutPage() {
  return (
    <main className="p-6 text-gray-900 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-red-500">About StockED</h1>
      <p className="mb-4">
        <strong>StockED</strong> is a personal project built to explore the key indicators 
        that drive global financial markets.
      </p>

      <p>
        It aggregates S&P 500 pricing data, intrinsic value calculations, CAPE ratios, 
        Buffett Index, yield spreads, and volatility metrics to visualize how valuations 
        and macro trends interact.
      </p>

      <p className="mt-4 italic text-gray-600">
        Built with Next.js, FastAPI, and Recharts — for those who love data-driven investing.
      </p>
    </main>
  );
}
