import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 p-6 hidden md:block">
                <h2 className="text-xl font-bold text-blue-400 mb-8">AI Resume</h2>

                <nav className="space-y-4">
                    <a href="/dashboard" className="block hover:text-blue-400">Dashboard</a>
                    <a href="/analyze" className="block hover:text-blue-400">Analyze Resume</a>
                    <a href="/jobs" className="block hover:text-blue-400">Job Matches</a>
                    <a href="/profile" className="block hover:text-blue-400">Profile</a>
                </nav>
            </aside>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Top Navbar */}
                <header className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                        Logout
                    </button>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;
