'use client';
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

type WeightProgressProps = {
  data?: { date: string; weight: number }[]; // Placeholder for when we hook up real data
};

export default function WeightProgress({ data = [

    { date: "Mar 14", weight: 5 },
    { date: "Mar 15", weight: 6 },
    { date: "Mar 16", weight: 7 },
    { date: "Mar 17", weight: 8 },
    { date: "Mar 18", weight: 9 },
    { date: "Mar 19", weight: 10 },
    { date: "Mar 20", weight: 11 },
    
] }: WeightProgressProps) {
  return (
    <div className="flex flex-col gap-4 w-full bg-white border border-purple-200 rounded-2xl shadow-md p-4 md:p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-purple-600">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold text-purple-700">Weight Progress</h2>
        </div>
      </div>

      {/* Chart or Placeholder */}
      <div className="flex justify-center items-center py-4 h-60">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No weight progress data yet. Log your pet’s weight to start tracking! 📈
          </p>
        )}
      </div>
    </div>
  );
}
