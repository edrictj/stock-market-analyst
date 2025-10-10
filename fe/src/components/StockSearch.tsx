"use client";
import { useState } from "react";
import StockCard from "./StockCard";

export default function StockSearch() {
  const [ticker, setTicker] = useState("");
  const [submittedTicker, setSubmittedTicker] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedTicker(ticker.toUpperCase());
  };

  return (
    <div>
      <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white flex-grow"
        />
        <button className="bg-red-500 px-4 py-2 rounded text-white">Check</button>
      </form>

      {submittedTicker && (
        <StockCard
          ticker={submittedTicker}
          marketPrice={150}        // dummy data
          intrinsicValue={170}     // dummy data
        />
      )}
    </div>
  );
}
