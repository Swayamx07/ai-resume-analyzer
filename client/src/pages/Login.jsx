import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import HeroBackground from "../components/HeroBackground";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 shadow-[0_0_40px_rgba(59,130,246,0.15)]">

            <HeroBackground />

            //Hero Text
            <div className="text-center mb-10 space-y-3">
                <h1 className="text-5xl font-semibold tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-slate-400">
                    Continue your AI-powered resume journey
                </p>
            </div>

            //Login Card
            <div className="
                w-full
                max-w-md
                backdrop-blur-xl
                bg-white/[0.04]
                border border-white/10
                rounded-2xl
                p-8
                shadow-2xl
            ">

                <h2 className="text-xl font-semibold mb-6 text-center">
                    Login to AI Resume
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="
                            w-full
                            p-3
                            rounded-lg
                            bg-[#0b0b0f]
                            border border-white/10
                            outline-none
                            focus:border-blue-500
                            transition
                        "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="
                            w-full
                            p-3
                            rounded-lg
                            bg-[#0b0b0f]
                            border border-white/10
                            outline-none
                            focus:border-blue-500
                            transition
                        "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="
                            w-full
                            py-3
                            rounded-lg
                            bg-blue-600
                            hover:bg-blue-500
                            transition
                            font-medium
                        "
                    >
                        Login
                    </button>

                    <p className="text-sm text-slate-400 text-center pt-2">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-400 hover:underline">
                            Register
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;