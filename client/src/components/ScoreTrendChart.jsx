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
        <div className="bg-slate-900 p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4">Match Score Trend</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreTrendChart;
