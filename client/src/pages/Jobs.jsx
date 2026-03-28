import JobCard from "../components/JobCard";
import { useEffect, useState } from "react";
import API from "../api";

export default function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get("/jobs/real");
                setJobs(res.data.jobs);
            } catch (err) {
                console.log(err);
                setError("Failed to load jobs");
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">

            <h1 className="text-3xl font-semibold mb-6">
                Recommended Jobs
            </h1>

            {/* LOADING */}
            {loading && (
                <p className="text-gray-400 animate-pulse">
                    Fetching real jobs for you...
                </p>
            )}

            {/* ERROR */}
            {error && (
                <p className="text-red-400">{error}</p>
            )}

            {/* EMPTY */}
            {!loading && jobs.length === 0 && (
                <p className="text-gray-500">
                    No jobs found. Try improving your resume skills.
                </p>
            )}

            {/* JOBS GRID */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">

                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}

            </div>

        </div>
    );
}