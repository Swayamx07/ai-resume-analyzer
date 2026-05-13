import { useEffect, useState } from "react";
import API from "../api";
import ResumeHistoryTable from "../components/ResumeHistoryTable";
import ScoreTrendChart from "../components/ScoreTrendChart";

export default function History() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchResumes = async () => {

            try {

                const res = await API.get("/resumes");
                setResumes(res.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }
        };

        fetchResumes();

    }, []);

    return (

        <div className="space-y-8">

            {/* HEADER */}
            <div className="space-y-2">

                <h1 className="text-4xl font-semibold tracking-tight">
                    Resume History
                </h1>

                <p className="text-slate-400 text-base">
                    Track previous resume analyses, ATS scores,
                    detected skills, and performance improvements.
                </p>

            </div>

            {/* LOADING */}
            {loading && (

                <div className="
                    bg-white/[0.03]
                    border border-white/10
                    rounded-2xl
                    p-10
                    text-center
                    backdrop-blur-xl
                ">

                    <p className="text-slate-400 animate-pulse">
                        Loading resume history...
                    </p>

                </div>

            )}

            {/* EMPTY STATE */}
            {!loading && resumes.length === 0 && (

                <div className="
                    bg-white/[0.03]
                    border border-dashed border-white/10
                    rounded-2xl
                    p-12
                    text-center
                    backdrop-blur-xl
                ">

                    <h2 className="text-xl font-semibold mb-2">
                        No Resume History
                    </h2>

                    <p className="text-slate-400 text-sm">
                        Analyze your first resume to start tracking ATS performance.
                    </p>

                </div>

            )}

            {/* CONTENT */}
            {!loading && resumes.length > 0 && (

                <div className="space-y-6">

                    {/* TABLE */}
                    <div className="
                        bg-white/[0.03]
                        border border-white/10
                        rounded-2xl
                        p-6
                        backdrop-blur-xl
                    ">

                        <div className="mb-5">

                            <h2 className="text-2xl font-semibold">
                                Resume Analyses
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                View all analyzed resumes and ATS match scores.
                            </p>

                        </div>

                        <ResumeHistoryTable resumes={resumes} />

                    </div>

                    {/* CHART */}
                    <div className="
                        bg-white/[0.03]
                        border border-white/10
                        rounded-2xl
                        p-6
                        backdrop-blur-xl
                    ">

                        <div className="mb-5">

                            <h2 className="text-2xl font-semibold">
                                Score Trend
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                Monitor your ATS score improvements over time.
                            </p>

                        </div>

                        <ScoreTrendChart resumes={resumes} />

                    </div>

                </div>

            )}

        </div>
    );
}