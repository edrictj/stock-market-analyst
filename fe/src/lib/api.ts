import axios from "axios";

const BASE = "https://financialmodelingprep.com/stable";
const KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;

export async function getStockQuote(symbol: string) {
  const url = `${BASE}/quote?symbol=${symbol}&apikey=${KEY}`;
  const res = await axios.get(url);
  if (!res.data || res.data.length === 0) {
    throw new Error("No quote data");
  }
  return res.data[0];
}

export async function getIntrinsicValue(symbol: string) {
  const url = `${BASE}/discounted-cash-flow?symbol=${symbol}&apikey=${KEY}`;
  const res = await axios.get(url);
  if (!res.data || res.data.length === 0) {
    throw new Error("No DCF data");
  }
  return res.data[0];
}

export async function getMarketMetrics() {
  try {
    const [vixRes, spRes] = await Promise.all([
      axios.get(`${BASE}/quote?symbol=%5EVIX&apikey=${KEY}`),
      axios.get(`${BASE}/quote?symbol=%5EGSPC&apikey=${KEY}`),
    ]);
    const vix = vixRes.data?.[0]?.price;
    const sp500 = spRes.data?.[0]?.price;

    return {
      vix: vix ?? null,
      sp500: sp500 ?? null,
      buffettIndex: 185,
      cape: 31.5,
      yieldSpread: -0.4,
    };
  } catch (err) {
    console.error("Error fetching market metrics (stable):", err);
    return {
      vix: 22,
      sp500: 4800,
      buffettIndex: 185,
      cape: 31.5,
      yieldSpread: -0.4,
    };
  }
}
