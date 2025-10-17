# be/main.py
from io import StringIO
import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import re
import pandas as pd


# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FMP API base and key
FMP_BASE = "https://financialmodelingprep.com/stable"
FMP_API_KEY = os.getenv("FMP_API_KEY")

def fetch_fmp_data(endpoint: str, symbol: str):
    """Helper to fetch data from FMP API and handle errors."""
    url = f"{FMP_BASE}/{endpoint}?symbol={symbol}&apikey={FMP_API_KEY}"
    res = requests.get(url)
    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)
    data = res.json()
    if not data:
        raise HTTPException(status_code=404, detail=f"No data found for {symbol}")
    return data[0]

# ------------------------
# 3️⃣ Compute Buffett Indicator
# ------------------------
def fetch_buffet_index():
    url = "https://www.currentmarketvaluation.com/models/buffett-indicator.php"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Search for the text containing "Total US Stock Market Value"
    text = soup.get_text()
    
    market_cap_match = re.search(r"Total US Stock Market Value\s*=\s*\$([\d\.]+)T", text)
    gdp_match = re.search(r"Annualized GDP\s*=\s*\$([\d\.]+)T", text)
    
    if market_cap_match and gdp_match:
        market_cap = float(market_cap_match.group(1)) * 1e12
        gdp = float(gdp_match.group(1)) * 1e12
        buffett_indicator = (market_cap / gdp) * 100
        print(f"Total Market Cap: ${market_cap:,.0f}")
        print(f"GDP: ${gdp:,.0f}")
        print(f"Buffett Indicator: {buffett_indicator:.2f}%")
        return round(buffett_indicator,2)
    else:
        raise ValueError("Could not find market cap or GDP on the page")

@app.get("/stock/quote/{symbol}")
def get_stock_quote(symbol: str):
    return fetch_fmp_data("quote", symbol)

@app.get("/stock/dcf/{symbol}")
def get_intrinsic_value(symbol: str):
    return fetch_fmp_data("discounted-cash-flow", symbol)

@app.get("/market/metrics")
def get_market_metrics():
    try:
        vix = fetch_fmp_data("quote", "%5EVIX").get("price", 22)
        sp500 = fetch_fmp_data("quote", "%5EGSPC").get("price", 4800)
        buffetIndex = fetch_buffet_index()

        return {
            "vix": vix,
            "sp500": sp500,
            "buffettIndex": buffetIndex,
            "cape": 31.5,
            "yieldSpread": -0.4,
        }
    except Exception as e:
        print("Error fetching market metrics:", e)
        return {
            "vix": 22,
            "sp500": 4800,
            "buffettIndex": 185,
            "cape": 31.5,
            "yieldSpread": -0.4,
        }
