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

        <div className="space-y-8">

            {/* HERO */}
            <div className="space-y-2">

                <h1 className="text-4xl font-semibold tracking-tight">
                    Welcome back 👋
                </h1>

                <p className="text-slate-400 text-base">
                    Track resume performance, ATS scores, and job opportunities.
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                <StatCard
                    title="Resumes Analyzed"
                    value={stats.resumeCount}
                    color="text-blue-400"
                />

                <StatCard
                    title="Latest ATS Score"
                    value={`${stats.latestScore}%`}
                    color="text-green-400"
                />

                <StatCard
                    title="Top Job Match"
                    value={stats.topJob}
                    color="text-purple-400"
                    small
                />

                <StatCard
                    title="Saved Jobs"
                    value={savedJobs.length}
                    color="text-yellow-400"
                />

            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* SAVED JOBS */}
                <div className="
                    xl:col-span-2
                    bg-white/[0.03]
                    border border-white/10
                    rounded-2xl
                    p-6
                    backdrop-blur-xl
                ">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-2xl font-semibold">
                                Saved Jobs
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                Your bookmarked opportunities
                            </p>
                        </div>

                        <Link
                            to="/jobs"
                            className="
                                text-blue-400
                                text-sm
                                hover:text-blue-300
                                transition
                            "
                        >
                            View All →
                        </Link>

                    </div>

                    {savedJobs.length === 0 ? (

                        <div className="
                            flex
                            items-center
                            justify-center
                            h-40
                            border border-dashed border-white/10
                            rounded-xl
                        ">

                            <p className="text-slate-500 text-sm">
                                No saved jobs yet.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {savedJobs.slice(0, 5).map((job, index) => (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border border-white/5
                                        bg-white/[0.02]
                                        rounded-xl
                                        p-4
                                        hover:border-blue-500/20
                                        transition
                                    "
                                >

                                    <div className="space-y-1">

                                        <p className="font-medium text-white">
                                            {job.title}
                                        </p>

                                        <p className="text-sm text-slate-400">
                                            {job.company}
                                        </p>

                                    </div>

                                    <a
                                        href={job.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            text-blue-400
                                            text-sm
                                            hover:text-blue-300
                                            transition
                                        "
                                    >
                                        View →
                                    </a>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* HISTORY CARD */}
                <div className="
                    bg-white/[0.03]
                    border border-white/10
                    rounded-2xl
                    p-6
                    backdrop-blur-xl
                    flex
                    flex-col
                    justify-between
                ">

                    <div>

                        <h2 className="text-2xl font-semibold mb-3">
                            Resume History
                        </h2>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            Explore previous analyses, ATS scores,
                            detected skills, and resume performance trends.
                        </p>

                    </div>

                    <Link
                        to="/history"
                        className="
                            inline-flex
                            items-center
                            mt-8
                            text-blue-400
                            text-sm
                            hover:text-blue-300
                            transition
                        "
                    >
                        Go to History →
                    </Link>

                </div>

            </div>

        </div>
    );
}

/* STAT CARD */
function StatCard({ title, value, color, small }) {

    return (

        <div className="
            bg-white/[0.03]
            border border-white/10
            rounded-2xl
            p-6
            backdrop-blur-xl
            hover:border-white/20
            transition
        ">

            <p className="text-sm text-slate-400">
                {title}
            </p>

            <h3 className={`
                mt-3
                font-semibold
                tracking-tight
                ${small ? "text-2xl" : "text-4xl"}
                ${color}
            `}>
                {value}
            </h3>

        </div>

    );
}

export default DashboardHome;