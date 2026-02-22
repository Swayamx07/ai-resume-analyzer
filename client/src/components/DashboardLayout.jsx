import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";


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
        <div className="relative flex min-h-screen text-slate-200 bg-[#020617] overflow-hidden">


            {/* Sidebar */}
            <aside className="relative z-10 w-64 bg-white/[0.03] backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
                <h2 className="text-xl font-bold text-blue-400 mb-10">
                    AI Resume
                </h2>

                <nav className="space-y-5 text-sm">
                    <Link to="/dashboard" className="block hover:text-blue-400 transition">
                        Dashboard
                    </Link>

                    <Link to="/analyze" className="block hover:text-blue-400 transition">
                        Analyze
                    </Link>

                    <Link to="/jobs" className="block hover:text-blue-400 transition">
                        Jobs
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <div className="relative z-10 flex-1 flex flex-col">

                {/* Navbar */}
                <header className="bg-white/[0.03] backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold tracking-tight">
                        Dashboard
                    </h1>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                            User: {userId.slice(-6)}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600/90 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;
