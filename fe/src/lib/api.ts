const BASE = "http://localhost:8000"; // your FastAPI backend URL

export async function getStockQuote(symbol: string) {
  const res = await fetch(`${BASE}/stock/quote/${symbol}`);
  if (!res.ok) throw new Error("No quote data");
  return res.json();
}

export async function getIntrinsicValue(symbol: string) {
  const res = await fetch(`${BASE}/stock/dcf/${symbol}`);
  if (!res.ok) throw new Error("No DCF data");
  return res.json();
}

export async function getMarketMetrics() {
  const res = await fetch(`${BASE}/market/metrics`);
  if (!res.ok) throw new Error("Failed to fetch market metrics");
  return res.json();
}

