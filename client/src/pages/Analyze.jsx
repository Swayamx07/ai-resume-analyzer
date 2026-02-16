import { useState, useEffect } from "react";
import API from "../api";

function Analyze() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    const [jobRoles, setJobRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await API.get("/jobs");
                console.log("Roles from backend:", res.data);

                setJobRoles(res.data);

                if (res.data.length > 0) {
                    setRole(res.data[0].title);
                }
            } catch (err) {
                console.error("Failed to fetch roles", err);
            }
        };

        fetchRoles();
    }, []);


    useEffect(() => {
        if (jobRoles.length > 0) {
            setRole(jobRoles[0].title);
        }
    }, [jobRoles]);


    const handleSubmit = async () => {
        if (!file) {
            setError("Please upload a PDF resume");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("role", role);

        try {
            const res = await API.post("/analyze", formData);
            setResult(res.data);
        } catch (err) {
            setError("Analysis failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <h2 className="text-2xl font-bold">Analyze Resume</h2>

            <div className="bg-slate-900 p-6 rounded-xl space-y-4">

                {/* File Upload */}
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-3 bg-slate-800 rounded"
                />

                {/* Role Selector */}

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 bg-slate-800 rounded"
                >
                    <option value="" disabled>
                        Select a Job Role
                    </option>

                    {jobRoles.map((job) => (
                        <option key={job._id} value={job.title}>
                            {job.title}
                        </option>
                    ))}
                </select>



                {/* Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

                {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                )}
            </div>


            {/* Results Section */}
            {result?.aiFeedback && (
                <div className="mt-6 space-y-6">

                    {/* Summary */}
                    {result.aiFeedback.summary && (
                        <div>
                            <h3 className="text-lg font-semibold text-blue-400">
                                Professional Summary
                            </h3>
                            <p className="text-slate-300 mt-2">
                                {result.aiFeedback.summary}
                            </p>
                        </div>
                    )}

                    {/* Strengths */}
                    {result.aiFeedback.strengths?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-green-400">
                                Strengths
                            </h3>
                            <ul className="list-disc list-inside text-slate-300 mt-2">
                                {result.aiFeedback.strengths.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Missing Skills */}
                    {result.aiFeedback.missingSkills?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-400">
                                Missing Skills
                            </h3>
                            <ul className="list-disc list-inside text-slate-300 mt-2">
                                {result.aiFeedback.missingSkills.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Suggestions */}
                    {result.aiFeedback.suggestions?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-400">
                                Suggestions
                            </h3>
                            <ul className="list-disc list-inside text-slate-300 mt-2">
                                {result.aiFeedback.suggestions.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Career Advice */}
                    {result.aiFeedback.careerAdvice && (
                        <div>
                            <h3 className="text-lg font-semibold text-purple-400">
                                Career Advice
                            </h3>
                            <p className="text-slate-300 mt-2">
                                {result.aiFeedback.careerAdvice}
                            </p>
                        </div>
                    )}

                </div>
            )}



        </div>
    );
}

export default Analyze;
