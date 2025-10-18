"use client";
import { useState, useEffect } from "react";
import StockSearch from "./StockSearch";
import MarketRisk from "./MarketRisk";
import MetricCard from "./MetricCard";
import MarketChart from "./MarketChart";
import { getMarketMetrics } from "@/lib/api";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<"valuation" | "crash">("valuation");
  const [metrics, setMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  // Fetch market metrics for crash predictor
  useEffect(() => {
    if (activeTab === "crash") {
      async function loadMetrics() {
        setLoadingMetrics(true);
        try {
          const data = await getMarketMetrics();
          setMetrics(data);
        } catch (error) {
          console.error("Failed to load metrics:", error);
        }
        setLoadingMetrics(false);
      }
      loadMetrics();
    }
  }, [activeTab]);

  return (
    <div>
      {/* === Tab Switch Buttons === */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "valuation"
              ? "bg-red-500 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("valuation")}
        >
          Valuation
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activeTab === "crash"
              ? "bg-red-500 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
          onClick={() => setActiveTab("crash")}
        >
          Market Risk
        </button>
      </div>

      {/* === Tab Content === */}
      <div>
        {activeTab === "valuation" ? (
          <StockSearch />
        ) : loadingMetrics ? (
          <p>Loading market data...</p>
        ) : metrics ? (
          <div className="grid md:grid-cols-2 gap-6">
            <MarketRisk risk={metrics.crashProbability} />
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Buffett Indicator"
                value={`${metrics.buffettIndex}%`}
              />
              <MetricCard label="VIX Index" value={metrics.vix} />
              <MetricCard label="CAPE Ratio" value={metrics.cape} />
              <MetricCard
                label="Yield Spread"
                value={`${metrics.yieldSpread}%`}
              />
            </div>
            <MarketChart />
          </div>
        ) : (
          <p>Failed to load market metrics.</p>
        )}
      </div>
    </div>
  );
}
