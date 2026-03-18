import { useEffect, useState } from "react";
import API from "../api";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get("/recommendations");
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
                    <div
                        key={i}
                        className="
                        bg-[#111114]
                        border border-white/10
                        rounded-2xl
                        p-6
                        transition
                        hover:border-blue-500/40
                        hover:scale-[1.02]
                    "
                    >
                        <h2 className="text-lg font-semibold mb-2">
                            {job.title}
                        </h2>

                        <p className="text-sm text-gray-400 mb-3">
                            {job.company_name}
                        </p>

                        <p className="text-xs text-gray-500 mb-4 line-clamp-4">
                            {job.description}
                        </p>

                        <a
                            href={job.url}
                            target="_blank"
                            className="
                            inline-block
                            px-4 py-2
                            bg-blue-600
                            rounded-lg
                            text-sm
                            hover:bg-blue-500
                        "
                        >
                            Apply Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}