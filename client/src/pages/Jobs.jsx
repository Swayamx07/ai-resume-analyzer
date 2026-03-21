import { useEffect, useState } from "react";
import API from "../api";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get("/jobs/recommend");
                setJobs(res.data.jobs);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    if (loading) return <p className="p-6">Loading jobs...</p>;

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-semibold">Job Recommendations</h1>

            {jobs.length === 0 && (
                <p className="text-gray-400">
                    Analyze a resume first to get job recommendations.
                </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {jobs.map((job, i) => (
                    <div key={i} className="bg-[#111114] border border-white/10 rounded-2xl p-6">

                        <h2 className="text-lg font-semibold mb-2">
                            {job.title}
                        </h2>

                        <p className="text-sm text-gray-400 mb-2">
                            Match Score: {job.score}%
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {job.matchedSkills.map((s, idx) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded-full">
                                    {s}
                                </span>
                            ))}
                        </div>

                        <p className="text-xs text-gray-500">
                            {job.description}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
}