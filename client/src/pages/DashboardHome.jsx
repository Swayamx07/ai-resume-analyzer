function DashboardHome() {
    return (
        <div className="space-y-8">

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Resumes Analyzed</h3>
                    <p className="text-3xl font-bold text-blue-400 mt-2">5</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Latest Match Score</h3>
                    <p className="text-3xl font-bold text-green-400 mt-2">78%</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                    <h3 className="text-sm text-slate-400">Top Job Match</h3>
                    <p className="text-3xl font-bold text-purple-400 mt-2">
                        Full Stack Dev
                    </p>
                </div>

            </div>

            {/* Resume History Panel */}
            <div className="bg-slate-900 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Resume Analyses</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div>
                            <p className="font-medium">Frontend Resume</p>
                            <p className="text-sm text-slate-400">Match Score: 70%</p>
                        </div>
                        <span className="text-xs text-slate-500">2 days ago</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div>
                            <p className="font-medium">Backend Resume</p>
                            <p className="text-sm text-slate-400">Match Score: 60%</p>
                        </div>
                        <span className="text-xs text-slate-500">1 week ago</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardHome;
