export default function MetricsPage() {
  return (
    <main className="p-6 text-gray-900 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Market Metrics Explained</h1>

      <section className="space-y-4">
        <p>
          The <strong>market pricing logic</strong> combines valuation indicators 
          (like intrinsic value and earnings yield) with macro sentiment data to estimate 
          whether markets are under- or overvalued.
        </p>

        <p>
          <strong>Intrinsic value</strong> estimates the fair value of an index based on 
          fundamentals such as long-term earnings, discount rates, and growth expectations.
        </p>

        <p>
          <strong>VIX (Volatility Index)</strong> measures market fear. High VIX 
          usually precedes increased volatility or corrections.
        </p>

        <p>
          <strong>CAPE Ratio (Shiller P/E)</strong> compares current prices to the 
          10-year inflation-adjusted earnings average. A high CAPE often signals overvaluation.
        </p>

        <p>
          <strong>Buffett Indicator</strong> — the ratio of total U.S. stock market 
          capitalization to GDP — indicates general overvaluation when above 150%.
        </p>

        <p>
          <strong>Yield Spread</strong> (10-year minus 2-year Treasury) signals economic 
          confidence. An inverted spread is a common recession predictor.
        </p>

        <p className="mt-6">
          These four metrics — <strong>VIX</strong>, <strong>CAPE Ratio</strong>, 
          <strong>Buffett Indicator</strong>, and <strong>Yield Spread</strong> — 
          are weighted in StockED’s model to estimate crash likelihood:
        </p>

        <ul className="list-disc ml-8">
          <li>High CAPE and Buffett → overvaluation risk</li>
          <li>High VIX → volatility risk</li>
          <li>Inverted yield spread → recession probability</li>
        </ul>

        <p className="mt-4">
          When multiple indicators align negatively, the model flags a heightened 
          <span className="text-red-500 font-semibold"> likelihood of market correction.</span>
        </p>
      </section>
    </main>
  );
}
