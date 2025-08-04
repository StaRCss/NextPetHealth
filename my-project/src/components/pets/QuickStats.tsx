import { TrendingUp } from "lucide-react";

type QuickStatsProps = {
  weight?: number | null;
};

type StatBoxProps = {
  value?: number | null;
  unit: string;
  fallback?: string;
};

const StatBox = ({ value, unit, fallback = "-" }: StatBoxProps) => (
  <div className="flex flex-col items-center justify-center px-6 py-4 bg-purple-50 border border-purple-200 rounded-xl shadow-sm w-full">
    <p className="text-2xl md:text-3xl font-bold text-purple-600">
      {value != null ? value : fallback}
      <span className="ml-1 text-xl md:text-2xl font-medium text-purple-400">{unit}</span>
    </p>
  </div>
);

export default function QuickStats({ weight }: QuickStatsProps) {
  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 text-purple-600">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2 className="text-lg md:text-2xl font-semibold text-purple-700">Quick Stats</h2>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 md:gap-6">
        <StatBox value={weight} unit="kg" />
        <StatBox value={null} unit="%" fallback="--" /> {/* Placeholder stat */}
      </div>
    </div>
  );
}
