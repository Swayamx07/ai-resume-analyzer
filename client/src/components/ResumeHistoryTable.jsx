function ResumeHistoryTable({ resumes }) {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mt-10">
            <h2 className="text-xl font-semibold mb-4">Resume Analysis History</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                            <th className="py-2">File</th>
                            <th>Role</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((r, i) => (
                            <tr key={i} className="border-b border-slate-800">
                                <td className="py-3">{r.fileName}</td>
                                <td>{r.role}</td>
                                <td className="text-green-400 font-medium">{r.matchScore}%</td>
                                <td className="text-slate-400">
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {resumes.length === 0 && (
                    <p className="text-slate-400 mt-4">No resume history yet.</p>
                )}
            </div>
        </div>
    );
}

export default ResumeHistoryTable;
