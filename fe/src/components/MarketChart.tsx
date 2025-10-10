"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jan", value: 3800 },
  { date: "Feb", value: 3900 },
  { date: "Mar", value: 3700 },
  { date: "Apr", value: 4000 },
  { date: "May", value: 3900 },
  { date: "Jun", value: 4100 },
];

export default function MarketChart() {
  return (
    <div className="bg-white text-black rounded-2xl p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">S&P 500 Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
