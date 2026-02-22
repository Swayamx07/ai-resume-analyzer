import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch {
            setError("Registration failed. Email may already exist.");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6">

            {/* HERO TEXT */}
            <div className="absolute top-24 text-center space-y-3">
                <h1 className="text-5xl font-semibold tracking-tight">
                    Create Account
                </h1>
                <p className="text-slate-400">
                    Start analyzing resumes with AI intelligence.
                </p>
            </div>

            {/* REGISTER CARD */}
            <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

                <h2 className="text-xl font-semibold mb-6 text-center">
                    Join AI Resume
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-lg bg-[#0b0b0f] border border-white/10 outline-none focus:border-blue-500 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg bg-[#0b0b0f] border border-white/10 outline-none focus:border-blue-500 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-[#0b0b0f] border border-white/10 outline-none focus:border-blue-500 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium"
                    >
                        Register
                    </button>

                    <p className="text-sm text-slate-400 text-center pt-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Register;