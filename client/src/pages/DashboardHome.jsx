import { useEffect, useState } from "react";
import API from "../api";
import ResumeHistoryTable from "../components/ResumeHistoryTable";
import ScoreTrendChart from "../components/ScoreTrendChart";

function DashboardHome() {
    const [stats, setStats] = useState({
        resumeCount: 0,
        latestScore: 0,
        topJob: "N/A",
    });

    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumesRes = await API.get("/resumes");
                const resumesData = resumesRes.data;

                setResumes(resumesData);

                setStats((prev) => ({
                    ...prev,
                    resumeCount: resumesData.length,
                    latestScore: resumesData[0]?.matchScore || 0,
                }));
            } catch (err) {
                console.error("Resume fetch error", err);
            }

            try {
                const jobsRes = await API.get("/jobs/recommend");
                const jobs = jobsRes.data;

                setStats((prev) => ({
                    ...prev,
                    topJob: jobs[0]?.role || "N/A",
                }));
            } catch (err) {
                console.error("Jobs fetch error", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-10">

            {/* PAGE TITLE */}
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">
                    Welcome back 👋
                </h1>
                <p className="text-slate-400 mt-1">
                    Here’s your resume analytics overview.
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Resumes Analyzed
                    </h3>
                    <p className="text-4xl font-semibold text-blue-400 mt-3">
                        {stats.resumeCount}
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Latest Match Score
                    </h3>
                    <p className="text-4xl font-semibold text-green-400 mt-3">
                        {stats.latestScore}%
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Top Job Match
                    </h3>
                    <p className="text-4xl font-semibold text-purple-400 mt-3">
                        {stats.topJob}
                    </p>
                </div>

            </div>

            {/* TABLE */}
            <ResumeHistoryTable resumes={resumes} />

            {/* CHART */}
            <ScoreTrendChart resumes={resumes} />

        </div>
    );
}

export default DashboardHome;