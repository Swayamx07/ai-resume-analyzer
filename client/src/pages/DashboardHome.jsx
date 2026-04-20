import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function DashboardHome() {
    const [stats, setStats] = useState({
        resumeCount: 0,
        latestScore: 0,
        topJob: "N/A",
    });

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumesRes = await API.get("/resumes");
                const resumesData = resumesRes.data;

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

            try {
                const savedJobsRes = await API.get("/saved-jobs");
                setSavedJobs(savedJobsRes.data);
            } catch (err) {
                console.error("Saved jobs fetch error", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">
                    Welcome back 👋
                </h1>
                <p className="text-slate-400 mt-1">
                    Here’s your resume analytics overview.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Resumes Analyzed
                    </h3>
                    <p className="text-4xl font-semibold text-blue-400 mt-3">
                        {stats.resumeCount}
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Latest Match Score
                    </h3>
                    <p className="text-4xl font-semibold text-green-400 mt-3">
                        {stats.latestScore}%
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Top Job Match
                    </h3>
                    <p className="text-3xl font-semibold text-purple-400 mt-3">
                        {stats.topJob}
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm text-slate-400">
                        Saved Jobs
                    </h3>
                    <p className="text-4xl font-semibold text-yellow-400 mt-3">
                        {savedJobs.length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Saved Jobs</h2>

                        <Link
                            to="/jobs"
                            className="text-blue-400 text-sm hover:text-blue-300"
                        >
                            View All →
                        </Link>
                    </div>

                    {savedJobs.length === 0 ? (
                        <p className="text-slate-400 text-sm">
                            No saved jobs yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {savedJobs.slice(0, 5).map((job, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b border-white/10 pb-3"
                                >
                                    <div>
                                        <p className="font-medium">{job.title}</p>
                                        <p className="text-sm text-slate-400">
                                            {job.company}
                                        </p>
                                    </div>

                                    <a
                                        href={job.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-400 text-sm"
                                    >
                                        View →
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Resume History
                        </h2>

                        <p className="text-slate-400 text-sm mb-6">
                            View previous resume analyses, ATS scores, and performance trends.
                        </p>
                    </div>

                    <Link
                        to="/history"
                        className="inline-flex items-center text-blue-400 text-sm hover:text-blue-300"
                    >
                        Open History →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;