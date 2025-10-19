"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Metrics", path: "/metrics" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">StockED</h1>
      <nav className="space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`hover:text-red-400 transition ${
              pathname === item.path ? "text-red-400 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
