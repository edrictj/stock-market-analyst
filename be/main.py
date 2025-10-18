# be/main.py

import os
import time
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import re
import pandas as pd
import yfinance as yf
from typing import Any, Dict

# ------------------------
# Load environment variables
# ------------------------
load_dotenv()

# ------------------------
# Initialize FastAPI
# ------------------------
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Simple in-memory cache
# ------------------------
CACHE: Dict[str, Dict[str, Any]] = {}
CACHE_TTL = 3600  # seconds (1 hour)

def get_cache(key: str):
    if key in CACHE:
        entry = CACHE[key]
        if time.time() - entry["timestamp"] < CACHE_TTL:
            return entry["value"]
        else:
            del CACHE[key]
    return None

def set_cache(key: str, value: Any):
    CACHE[key] = {"value": value, "timestamp": time.time()}


# ------------------------
# Helper functions
# ------------------------
def fetch_fmp_data(endpoint: str, symbol: str):
    FMP_BASE = "https://financialmodelingprep.com/stable"
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    url = f"{FMP_BASE}/{endpoint}?symbol={symbol}&apikey={FMP_API_KEY}"
    res = requests.get(url)
    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)
    data = res.json()
    if not data:
        raise HTTPException(status_code=404, detail=f"No data found for {symbol}")
    return data[0]

def fetch_buffet_index():
    url = "https://www.currentmarketvaluation.com/models/buffett-indicator.php"
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text()

    market_cap_match = re.search(r"Total US Stock Market Value\s*=\s*\$([\d\.]+)T", text)
    gdp_match = re.search(r"Annualized GDP\s*=\s*\$([\d\.]+)T", text)

    if market_cap_match and gdp_match:
        market_cap = float(market_cap_match.group(1)) * 1e12
        gdp = float(gdp_match.group(1)) * 1e12
        buffett_indicator = (market_cap / gdp) * 100
        return round(buffett_indicator, 2)
    else:
        raise ValueError("Could not find market cap or GDP on the page")

def fetch_cape_ratio():
    url = "https://www.multpl.com/shiller-pe/table/by-year"
    df = pd.read_html(url)[0]
    latest_cape_str = df.iloc[0, 1]
    return float(latest_cape_str)

def fetch_yield_spread():
    FRED_API_KEY = os.getenv("FRED_API_KEY")
    url = "https://api.stlouisfed.org/fred/series/observations"
    params = {
        "series_id": "T10Y2Y",
        "api_key": FRED_API_KEY,
        "file_type": "json",
        "frequency": "d",
        "limit": 1
    }
    response = requests.get(url, params=params)
    data = response.json()
    latest_observation = data['observations'][0]
    spread = float(latest_observation['value'])
    return spread

def calculate_risk_probability(vix: float, buffett: float, cape: float, yield_spread: float) -> float:
    vix_risk = 1 if vix >= 30 else 0
    buffett_risk = 1 if buffett >= 120 else 0
    cape_risk = 1 if cape >= 30 else 0
    yield_risk = 1 if yield_spread < 0 else 0
    risk_count = vix_risk + buffett_risk + cape_risk + yield_risk

    if risk_count == 0:
        probability = 0.05
    elif risk_count == 1:
        probability = 0.15
    elif risk_count == 2:
        probability = 0.50
    elif risk_count == 3:
        probability = 0.70
    else:
        probability = 0.85
    return probability * 100

# ------------------------
# API Endpoints
# ------------------------
@app.get("/sp500")
def get_sp500_data():
    cache_key = "sp500"
    cached = get_cache(cache_key)
    if cached:
        return cached

    ticker = yf.Ticker("^GSPC")
    hist = ticker.history(period="1y")
    hist_monthly = hist.resample("M").mean()

    data = [
        {
            "date": date.strftime("%b %Y"),
            "value": round(row["Close"], 2)
        }
        for date, row in hist_monthly.iterrows()
    ]

    result = {"data": data}
    set_cache(cache_key, result)
    return result

@app.get("/stock/quote/{symbol}")
def get_stock_quote(symbol: str):
    return fetch_fmp_data("quote", symbol)

@app.get("/stock/dcf/{symbol}")
def get_intrinsic_value(symbol: str):
    return fetch_fmp_data("discounted-cash-flow", symbol)

@app.get("/market/metrics")
def get_market_metrics():
    cache_key = "market_metrics"
    cached = get_cache(cache_key)
    if cached:
        return cached

    try:
        vix = fetch_fmp_data("quote", "%5EVIX").get("price", 22)
        sp500 = fetch_fmp_data("quote", "%5EGSPC").get("price", 4800)
        buffetIndex = fetch_buffet_index()
        cape = fetch_cape_ratio()
        yieldSpread = fetch_yield_spread()
        crashProbability = calculate_risk_probability(vix, buffetIndex, cape, yieldSpread)

        result = {
            "vix": vix,
            "sp500": sp500,
            "buffettIndex": buffetIndex,
            "cape": cape,
            "yieldSpread": yieldSpread,
            "crashProbability": crashProbability
        }

        set_cache(cache_key, result)
        return result

    except Exception as e:
        print("Error fetching market metrics:", e)
        fallback = {
            "vix": 22,
            "sp500": 4800,
            "buffettIndex": 185,
            "cape": 31.5,
            "yieldSpread": -0.4,
            "crashProbability": 100
        }
        set_cache(cache_key, fallback)
        return fallback
