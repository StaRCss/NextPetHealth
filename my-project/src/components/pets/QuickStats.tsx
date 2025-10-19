import { TrendingUp } from "lucide-react";

type WeightLog = {
  weight: number;
  unit: "kg" | "lb";
};

type QuickStatsProps = {
  latestWeightLog?: WeightLog | null;
};

type StatBoxProps = {
  value?: number | null;
  unit?: string;
  fallback?: string;
};

const StatBox = ({ value, unit, fallback = "-" }: StatBoxProps) => (
  <div
    className="
      flex flex-col items-center justify-center 
      px-6 py-4 w-full rounded-xl shadow-sm border 
      bg-gradient-to-br from-purple-50 to-pink-50 
      border-purple-200 
      dark:from-[#1e1e24] dark:to-[#2b2b32] dark:border-[#3a3a3f]
      transition-all hover:shadow-md hover:scale-[1.02]
    "
  >
    <p className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-[#f4c4f3]">
      {value != null ? value : fallback}
      {unit && (
        <span className="ml-1 text-xl md:text-2xl font-medium text-purple-400 dark:text-[#fc67fa]">
          {unit}
        </span>
      )}
    </p>
  </div>
);

export default function QuickStats({ latestWeightLog }: QuickStatsProps) {
  return (
    <div
      className="
        flex flex-col gap-5 w-full 
        bg-white dark:bg-zinc-900
        border border-purple-100 dark:border-zinc-800 
        rounded-2xl shadow-md p-5 md:p-6 
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="
            w-10 h-10 rounded-full 
            flex items-center justify-center 
            bg-gradient-to-r from-[#fc67fa] to-[#f4c4f3] 
            shadow-md
          "
        >
          <TrendingUp className="w-5 h-5 text-white drop-shadow-sm" />
        </div>
        <h2 className="text-lg md:text-2xl font-semibold text-purple-700 dark:text-[#f4c4f3]">
          Quick Stats
        </h2>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 md:gap-6">
        <StatBox
          value={latestWeightLog?.weight ?? null}
          unit={latestWeightLog?.unit}
        />
        <StatBox value={null} unit="%" fallback="--" />
      </div>
    </div>
  );
}
