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

        try {
            const res = await API.post("/analyze", formData);
            setResult(res.data);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6">

            <HeroBackground />

            {/* HERO TEXT */}
            <div className="text-center max-w-4xl space-y-6">

                <h1 className="
          text-5xl md:text-7xl
          font-semibold
          tracking-tight
        ">
                    Analyze your Resume
                    <br />
                    <span className="text-gray-400">
                        with AI intelligence
                    </span>
                </h1>

                <p className="text-gray-400 text-lg">
                    Upload your resume and get instant skill analysis,
                    match score, and career feedback powered by AI.
                </p>

            </div>

            {/* FORM */}
            <div className="
        mt-12
        w-full
        max-w-5xl
        bg-[#111114]
        border border-white/10
        rounded-2xl
        p-6
        space-y-4
      ">

                {/* Upload */}
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="
            w-full
            p-3
            rounded-lg
            bg-[#0b0b0f]
            border border-white/10
            text-sm
          "
                />

                {/* Role Select */}
                <div className="space-y-2">

                    <input
                        type="text"
                        placeholder="Search job role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
            w-full
            p-3
            rounded-lg
            bg-[#0b0b0f]
            border border-white/10
            text-sm
        "
                    />

                    <div className="max-h-40 overflow-y-auto border border-white/10 rounded-lg">

                        {filteredRoles.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => {
                                    setRole(job.title);
                                    setSearch(job.title);
                                }}
                                className="
                    px-3 py-2
                    cursor-pointer
                    hover:bg-white/10
                    text-sm
                "
                            >
                                {job.title}
                            </div>
                        ))}

                    </div>

                </div>

                {role && (
                    <p className="text-sm text-green-400">
                        Selected Role: {role}
                    </p>
                )}

                {/* Button */}
                <button
                    onClick={handleSubmit}
                    className="
            w-full
            py-3
            rounded-lg
            bg-blue-600
            hover:bg-blue-500
            transition
            font-medium
          "
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

            </div>

            {/* RESULT */}
            {result && (
                <div className="mt-14 w-full max-w-5xl space-y-6">

                    {/* SCORE CARD */}
                    <div className="
bg-[#111114]
border border-white/10
rounded-2xl
p-10
flex flex-col items-center
justify-center
transition hover:border-white/20
">

                        <p className="text-gray-400 text-sm">
                            Resume Match Score
                        </p>

                        <h2 className="
text-6xl
font-bold
mt-3
text-blue-500
">
                            {result.matchScore}%
                        </h2>

                        <div className="w-full bg-white/10 h-2 rounded-full mt-5 overflow-hidden">
                            <div
                                className="bg-blue-500 h-full"
                                style={{ width: `${result.matchScore}%` }}
                            />
                        </div>

                        <p className="text-gray-500 mt-3 text-sm">
                            Based on role skill requirements
                        </p>

                    </div>


                    {/* GRID CARDS */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* SUMMARY */}
                        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01]">
                            <h3 className="text-lg font-semibold mb-2">Summary</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {result.aiFeedback?.summary}
                            </p>
                        </div>

                        {/* DETECTED SKILLS */}
                        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01] transition hover:border-white/20">

                            <h3 className="text-lg font-semibold mb-3">
                                Detected Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">

                                {result.detectedSkills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="
px-3
py-1
text-sm
bg-blue-500/10
text-blue-400
border
border-blue-500/20
rounded-full
"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>
                        </div>


                        {/* CAREER ADVICE */}
                        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01]">
                            <h3 className="text-lg font-semibold mb-2">Career Advice</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {result.aiFeedback?.careerAdvice}
                            </p>
                        </div>


                        {/* STRENGTHS */}
                        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01]">
                            <h3 className="text-lg font-semibold mb-3">Strengths</h3>

                            <div className="flex flex-wrap gap-2">
                                {result.aiFeedback?.strengths?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="
                        px-3
                        py-1
                        text-sm
                        bg-green-500/10
                        text-green-400
                        border
                        border-green-500/20
                        rounded-full
                    ">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>


                        {/* MISSING SKILLS */}
                        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01]">
                            <h3 className="text-lg font-semibold mb-3">Missing Skills</h3>

                            <div className="flex flex-wrap gap-2">
                                {result.aiFeedback?.missingSkills?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="
                        px-3
                        py-1
                        text-sm
                        bg-red-500/10
                        text-red-400
                        border
                        border-red-500/20
                        rounded-full
                    ">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>


                    {/* SUGGESTIONS */}
                    <div className="bg-[#111114] border border-white/10 rounded-2xl p-6
transition duration-200
hover:border-white/20
hover:scale-[1.01]">

                        <h3 className="text-lg font-semibold mb-3">
                            Suggestions to Improve Resume
                        </h3>

                        <ul className="space-y-2 text-yellow-400 text-sm">
                            {result.aiFeedback?.suggestions?.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-yellow-400">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>
            )}

        </div>
    );
}