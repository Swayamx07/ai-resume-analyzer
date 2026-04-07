import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LayoutDashboard, FileText, Briefcase } from "lucide-react";

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
            <aside className="w-64 bg-white/[0.03] backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">

                <h2 className="text-xl font-bold text-blue-400 mb-9">
                    AI Resume
                </h2>

                <nav className="flex flex-col gap-2 text-sm">

                    <NavItem
                        to="/dashboard"
                        icon={<LayoutDashboard size={18} />}
                        label="Dashboard"
                    />

                    <NavItem
                        to="/analyze"
                        icon={<FileText size={18} />}
                        label="Analyze"
                    />

                    <NavItem
                        to="/jobs"
                        icon={<Briefcase size={18} />}
                        label="Jobs"
                    />

                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">

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

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

/* 🔥 NavItem Component */
function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
                ${isActive
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"}`
            }
        >
            {icon}
            {label}
        </NavLink>
    );
}

export default DashboardLayout;