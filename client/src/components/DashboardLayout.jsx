import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DashboardLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let userId = "";

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.id;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 p-6 hidden md:block">
                <h2 className="text-xl font-bold text-blue-400 mb-8">
                    AI Resume
                </h2>

                <nav className="space-y-4">
                    <a href="/dashboard" className="block hover:text-blue-400">Dashboard</a>
                    <a href="/analyze" className="block hover:text-blue-400">Analyze</a>
                    <a href="/jobs" className="block hover:text-blue-400">Jobs</a>
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <header className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
                    <h1 className="text-lg font-semibold">Dashboard</h1>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                            User: {userId.slice(-6)}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;
