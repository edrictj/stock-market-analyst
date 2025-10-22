# 📈 FastAPI Financial Data API

This project provides a **FastAPI-based backend** for fetching and processing financial metrics such as the **Shiller PE Ratio**, **yield spread**, and **Buffett Indicator**.  
It can serve data to a frontend dashboard (e.g., Next.js or React).

---

## 🚀 Features
- Fetches and cleans financial data from public sources  
- Provides JSON endpoints for market metrics  
- CORS enabled for frontend integration  
- Simple deployment-ready structure

Step 1: Create a virtual env
python -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows

Step 2: Install dependencies
pip install -r requirements.txt

Step 3: Create .env file
API_KEY=your_api_key_here

Step 4: Run the app
uvicorn main:app --reload

By default, the API runs at:
http://127.0.0.1:8000
