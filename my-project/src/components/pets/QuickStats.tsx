import { TrendingUp } from 'lucide-react';

type QuickStatsProps = {
    weight?: number | null;
};

type StatBoxProps = {
    value?: number | null;
    unit: string;
    fallback?: string;
};

const StatBox = ({ value, unit, fallback = "-" }: StatBoxProps) => (
    <div className="flex flex-col items-center justify-center h-14 md:h-28 border rounded-lg w-2/4 bg-purple-100 ">
        <p className="text-2xl font-bold md:text-3xl text-purple-500">
            {value != null ? `${value} ` : fallback}
            <span className="text-xl md:text-2xl text-purple-500 font-normal">{unit}</span>
        </p>
    </div>
);

export default function QuickStats({ weight }: QuickStatsProps) {
    return (
        <div className="flex flex-col w-full bg-white border border-purple-200 rounded-lg shadow-md py-2 h-32 md:h-52 lg:h-56 xl:h-60">
            <div className="flex flex-row gap-3 items-start justify-start text-purple-500 px-4">
                <TrendingUp />
                <h2 className="text md:text-2xl font-semibold">Quick Stats</h2>
            </div>
            <div className="flex flex-row gap-4 md:gap-6 items-center justify-between h-full px-4">
                <StatBox value={weight} unit="kg" />
                <StatBox value={null} unit="%" /> {/* Replace with actual "age" value and "unit" */}
            </div>
        </div>
    );
}
