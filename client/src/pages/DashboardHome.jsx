import { useEffect, useState } from "react";
import API from "../api";

function DashboardHome() {
    const [stats, setStats] = useState({
        resumeCount: 0,
        latestScore: 0,
        topJob: "N/A",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumesRes = await API.get("/resumes");
                const jobsRes = await API.get("/jobs/recommend");

                const resumes = resumesRes.data;
                const jobs = jobsRes.data;

                setStats({
                    resumeCount: resumes.length,
                    latestScore: resumes[0]?.matchScore || 0,
                    topJob: jobs[0]?.role || "N/A",
                });

            } catch (err) {
                console.error("Dashboard fetch error", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Resumes Analyzed</h3>
                    <p className="text-3xl font-bold text-blue-400 mt-2">
                        {stats.resumeCount}
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Latest Match Score</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2">
                        {stats.latestScore}%
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Top Job Match</h3>
                    <p className="text-3xl font-bold text-purple-400 mt-2">
                        {stats.topJob}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default DashboardHome;
