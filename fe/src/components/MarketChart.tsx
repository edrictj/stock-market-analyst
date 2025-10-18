"use client";
import { getSp500 } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Module-level cache to prevent multiple API calls
let sp500Cache: { date: string; value: number }[] | null = null;

export default function MarketChart() {
  const [data, setData] = useState<{ date: string; value: number }[]>(sp500Cache ?? []);

  useEffect(() => {
    // If we already have cached data, no need to fetch
    if (sp500Cache) return;

    (async () => {
      try {
        const json = await getSp500();
        const rawData = json.data ?? json;

        if (!Array.isArray(rawData)) {
          console.error("Unexpected S&P 500 data format:", rawData);
          return;
        }

        const monthOrder = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const cleaned = rawData
          .map((d) => ({
            date: d.date,
            value: Number(d.value),
          }))
          .sort((a, b) => {
            const [monthA, yearA] = a.date.split(" ");
            const [monthB, yearB] = b.date.split(" ");
            const yearDiff = Number(yearA) - Number(yearB);
            if (yearDiff !== 0) return yearDiff;
            return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
          });

        sp500Cache = cleaned; // save to module-level cache
        setData(cleaned);
      } catch (err) {
        console.error("Error fetching S&P 500 data:", err);
      }
    })();
  }, []);

  return (
    <div className="bg-white text-black rounded-2xl p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">S&P 500 (Past 12 Months)</h2>
      {data.length > 0 ? (
        <div style={{ width: "100%", height: 300, paddingBottom: "10px" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 40, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={25} // space for rotated labels
              />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f87171"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading chart...</p>
      )}
    </div>
  );
}
