import { useEffect, useState } from "react";
import API from "../api";
import ResumeHistoryTable from "../components/ResumeHistoryTable";
import ScoreTrendChart from "../components/ScoreTrendChart";

export default function History() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await API.get("/resumes");
                setResumes(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchResumes();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">
                    Resume History
                </h1>
                <p className="text-slate-400 mt-1">
                    View all your previous resume analyses and performance trends.
                </p>
            </div>

            <ResumeHistoryTable resumes={resumes} />
            <ScoreTrendChart resumes={resumes} />
            
        </div>
    );
}