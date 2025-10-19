"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm py-6 px-4 mt-auto border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left leading-relaxed">
        <div>
          <p className="text-gray-300">
            Data sourced from{" "}
            <span className="text-gray-200 font-medium">
              Yahoo Finance, Financial Modeling Prep (FMP), FRED, Multpl.com,
              and CurrentMarketValuation.com
            </span>
            .
          </p>
          <p className="text-gray-400">Cached and refreshed hourly for performance.</p>
        </div>

        <nav className="space-x-6">
          <Link href="/dashboard" className="hover:text-red-400 transition">
            Dashboard
          </Link>
          <Link href="/metrics" className="hover:text-red-400 transition">
            Metrics
          </Link>
          <Link href="/about" className="hover:text-red-400 transition">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
