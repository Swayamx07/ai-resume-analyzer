import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

function ScoreTrendChart({ resumes }) {
    const chartData = [...resumes]
        .reverse()
        .map((r, index) => ({
            id: index + 1,
            score: Number(r.matchScore),
            role: r.role || "Unknown Role",
            date: new Date(r.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }),
            fullDate: new Date(r.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        }));

    return (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl mt-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Match Score Trend
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Track how your resume performance changes over time
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-slate-500">Latest Score</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {chartData[chartData.length - 1]?.score || 0}%
                    </p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        stroke="rgba(255,255,255,0.06)"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={20}
                    />

                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                    />

                    <Tooltip
                        cursor={{
                            stroke: "#3b82f6",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                        }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;

                                return (
                                    <div className="bg-[#020617] border border-white/10 rounded-xl p-4 shadow-xl min-w-[220px]">
                                        <p className="text-gray-400 text-sm mb-2">
                                            {data.fullDate}
                                        </p>

                                        <p className="text-white text-sm mb-1">
                                            Role:
                                        </p>

                                        <p className="text-slate-300 text-sm mb-3">
                                            {data.role}
                                        </p>

                                        <p className="text-blue-400 text-lg font-semibold">
                                            Match Score: {data.score}%
                                        </p>
                                    </div>
                                );
                            }

                            return null;
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="none"
                        fill="url(#scoreGradient)"
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            fill: "#3b82f6",
                            strokeWidth: 2,
                            stroke: "#93c5fd",
                        }}
                        activeDot={{
                            r: 8,
                            fill: "#60a5fa",
                            stroke: "#dbeafe",
                            strokeWidth: 3,
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreTrendChart;