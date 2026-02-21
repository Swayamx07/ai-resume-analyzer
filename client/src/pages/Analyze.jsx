import { useEffect, useState } from "react";
import API from "../api";
import HeroBackground from "../components/HeroBackground";

export default function Analyze() {
    const [file, setFile] = useState(null);
    const [role, setRole] = useState("");
    const [jobRoles, setJobRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

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
        max-w-xl
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
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="
            w-full
            p-3
            rounded-lg
            bg-[#0b0b0f]
            border border-white/10
          "
                >
                    <option value="">Select Job Role</option>

                    {jobRoles.map((job) => (
                        <option key={job._id} value={job.title}>
                            {job.title}
                        </option>
                    ))}
                </select>

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
                <div className="
          mt-10
          max-w-xl
          w-full
          bg-[#111114]
          border border-white/10
          rounded-2xl
          p-6
        ">
                    <h3 className="text-xl font-semibold mb-3">
                        Match Score: {result.matchScore}%
                    </h3>

                    <p className="text-gray-400">
                        {result.aiFeedback?.summary}
                    </p>
                </div>
            )}

        </div>
    );
}