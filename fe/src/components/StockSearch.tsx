"use client";
import { useState } from "react";
import StockCard from "./StockCard";
import { getStockQuote, getIntrinsicValue } from "@/lib/api";

export default function StockSearch() {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [quote, intrinsic] = await Promise.all([
        getStockQuote(ticker),
        getIntrinsicValue(ticker),
      ]);
      setData({
        ticker: quote.symbol,
        marketPrice: quote.price,
        intrinsicValue: intrinsic.dcfs || intrinsic.dcf,
      });
    } catch (err) {
      console.error(err);
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock ticker (e.g. AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white flex-grow"
        />
        <button className="bg-red-500 px-4 py-2 rounded text-white">Check</button>
      </form>

      {loading && <p>Loading...</p>}

      {data && (
        <StockCard
          ticker={data.ticker}
          marketPrice={data.marketPrice}
          intrinsicValue={data.intrinsicValue}
        />
      )}
    </div>
  );
}
