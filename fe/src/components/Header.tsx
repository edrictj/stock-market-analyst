export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold"> StockED</h1>
      <nav className="space-x-4">
        <a href="#" className="hover:text-red-400">Dashboard</a>
        <a href="#" className="hover:text-red-400">Metrics</a>
        <a href="#" className="hover:text-red-400">About</a>
      </nav>
    </header>
  );
}
