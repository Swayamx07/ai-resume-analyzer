import { useEffect, useState } from "react";
import API from "../api";
import HeroBackground from "../components/HeroBackground";

export default function Analyze() {

    const [file, setFile] = useState(null);
    const [role, setRole] = useState("");
    const [jobRoles, setJobRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [search, setSearch] = useState("");

    const filteredRoles = jobRoles.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await API.get("/jobs");
                setJobRoles(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async () => {

        if (!file || !role) return;

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("role", role);

        setLoading(true);
        setResult(null);

        try {
            const res = await API.post("/analyze", formData);
            setResult(res.data);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center px-6 pb-20">
            <HeroBackground />

            {/* HERO */}
            <div className="text-center max-w-4xl space-y-6 mt-20">
                <h1 className="text-5xl md:text-7xlfont-semibold tracking-tight">
                    Analyze your Resume
                    <br />
                    <span className="text-gray-400">
                        with AI intelligence
                    </span>
                </h1>

                <p className="text-gray-400 text-lg">
                    Upload resume → get ATS score → improve skills → discover real jobs
                </p>
            </div>

            {/* FORM */}
            <div className="mt-12 w-full max-w-5xl bg-[#111114] border border-white/10 rounded-2xl p-6 space-y-4">

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-3 rounded-lg bg-[#0b0b0f] border border-white/10 text-sm"
                />

                <input
                    type="text"
                    placeholder="Search job role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#0b0b0f] border border-white/10 text-sm"
                />

                <div className="max-h-40 overflow-y-auto border border-white/10 rounded-lg">
                    {filteredRoles.map((job) => (
                        <div
                            key={job._id}
                            onClick={() => {
                                setRole(job.title);
                                setSearch(job.title);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-white/10 text-sm"
                        >
                            {job.title}
                        </div>
                    ))}
                </div>

                {role && (
                    <p className="text-sm text-green-400">
                        Selected Role: {role}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium"
                >
                    {loading ? "Analyzing Resume..." : "Analyze Resume"}
                </button>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="mt-20 text-gray-400 animate-pulse">
                    AI is analyzing resume and finding jobs...
                </div>
            )}

            {/* RESULT */}
            {result && (
                <div className="mt-14 w-full max-w-6xl space-y-6">

                    {/* SCORE */}
                    <div className="bg-[#111114] border border-white/10 rounded-2xl p-10 text-center">
                        <p className="text-gray-400 text-sm">ATS Match Score</p>
                        <h2 className="text-6xl font-bold mt-3 text-blue-500">
                            {result.matchScore}%
                        </h2>

                        <div className="w-full bg-white/10 h-2 rounded-full mt-5 overflow-hidden">
                            <div
                                className="bg-blue-500 h-full"
                                style={{ width: `${result.matchScore}%` }}
                            />
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <Card title="Summary">
                            {result.aiFeedback?.summary}
                        </Card>

                        <SkillsCard
                            title="Detected Skills"
                            color="blue"
                            data={result.detectedSkills}
                        />

                        <SkillsCard
                            title="Strengths"
                            color="green"
                            data={result.aiFeedback?.strengths}
                        />

                        <SkillsCard
                            title="Missing Skills"
                            color="red"
                            data={result.aiFeedback?.missingSkills}
                        />

                        <Card title="Career Advice">
                            {result.aiFeedback?.careerAdvice}
                        </Card>

                    </div>

                    {/* JOBS */}
                    <div className="bg-[#111114] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Recommended Jobs
                        </h3>

                        {result.recommendedJobs?.length === 0 && (
                            <p className="text-gray-500 text-sm">
                                No strong job matches found. Improve missing skills to unlock more jobs.
                            </p>
                        )}

                        <div className="space-y-4">
                            {result.recommendedJobs?.map((job, i) => (
                                <div
                                    key={i}
                                    className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition"
                                >
                                    <p className="font-semibold">{job.title}</p>
                                    <p className="text-sm text-gray-400">
                                        {job.company_name || "Company"}
                                    </p>

                                    <a
                                        href={job.url}
                                        target="_blank"
                                        className="text-blue-400 text-sm mt-2 inline-block"
                                    >
                                        Apply →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
        </div>
    );
}

function SkillsCard({ title, data, color }) {

    const colors = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        green: "bg-green-500/10 text-green-400 border-green-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20"
    };

    return (
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>

            <div className="flex flex-wrap gap-2">
                {data?.map((item, i) => (
                    <span
                        key={i}
                        className={`px-3 py-1 text-sm border rounded-full ${colors[color]}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}