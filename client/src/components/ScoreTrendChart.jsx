import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

function ScoreTrendChart({ resumes }) {
    const chartData = resumes.map(r => ({
        date: new Date(r.createdAt).toLocaleDateString(),
        score: r.matchScore,
    }));

    return (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Match Score Trend</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" />

                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "#020617",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                        }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreTrendChart;
