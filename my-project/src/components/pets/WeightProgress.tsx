'use client';
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Scale } from "lucide-react";

type WeightProgressProps = {
  data?: { date: string; weight: number }[];
  unit?: string; // optional unit for Y-axis & tooltip
};

export default function WeightProgress({
  data = [],
  unit = "kg",
}: WeightProgressProps) {
  // Reverse for correct chronological chart
  const reversedData = [...data].reverse();

  // Calculate trend between last two logged weights
  const trend = useMemo(() => {
    if (data.length < 2) return null;
    const [latest, prev] = data; // data is newest first from parent
    const diff = latest.weight - prev.weight;
    return diff === 0
      ? { type: "same", diff }
      : diff > 0
      ? { type: "gain", diff }
      : { type: "loss", diff: Math.abs(diff) };
  }, [data]);

  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-purple-600">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-purple-700">
            Weight Progress
          </h2>
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.type === "gain"
                ? "text-red-500"
                : trend.type === "loss"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {trend.type === "gain" && <TrendingUp className="w-4 h-4" />}
            {trend.type === "loss" && <TrendingDown className="w-4 h-4" />}
            {trend.type === "gain" && `Gained ${trend.diff.toFixed(1)} ${unit}`}
            {trend.type === "loss" && `Lost ${trend.diff.toFixed(1)} ${unit}`}
            {trend.type === "same" && "No change"}
          </div>
        )}
      </div>

      {/* Chart or Placeholder */}
      <div className="flex justify-center items-center py-4 h-60">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={reversedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                tickFormatter={(val) => `${val}${unit}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #EDE9FE",
                }}
                formatter={(value: number) => [`${value} ${unit}`, "Weight"]}
                labelStyle={{ color: "#7E22CE" }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="url(#weightGradient)"
                strokeWidth={3}
                dot={{ r: 5, stroke: "#8b5cf6", strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center text-center text-gray-500 gap-2">
            <Scale className="w-8 h-8 text-purple-300" />
            <p className="text-sm italic">
              No weight progress yet — start logging to see trends 📈
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
