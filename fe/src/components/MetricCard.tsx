export default function MetricCard({ label, value }: any) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-md">
      <p className="text-sm text-gray-400">{label}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}
