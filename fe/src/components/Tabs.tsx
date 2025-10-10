"use client";
import { useState } from "react";
import StockSearch from "./StockSearch";
import MarketRisk from "./MarketRisk";
import MetricCard from "./MetricCard";
import MarketChart from "./MarketChart";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<"valuation" | "crash">("valuation");

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "valuation" ? "bg-red-500 text-white" : "bg-gray-800"
          }`}
          onClick={() => setActiveTab("valuation")}
        >
          Valuation
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "crash" ? "bg-red-500 text-white" : "bg-gray-800"
          }`}
          onClick={() => setActiveTab("crash")}
        >
          Market Risk
        </button>
      </div>

      <div>
        {activeTab === "valuation" ? (
          <StockSearch />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <MarketRisk />
            <div className="grid grid-cols-2 gap-4">
              <MetricCard label="Buffett Indicator" value="185%" />
              <MetricCard label="VIX Index" value="22.5" />
              <MetricCard label="CAPE Ratio" value="31.8" />
              <MetricCard label="Yield Spread" value="-0.35%" />
            </div>
            <MarketChart />
          </div>
        )}
      </div>
    </div>
  );
}
