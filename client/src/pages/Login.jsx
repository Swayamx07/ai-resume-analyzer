import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");

        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Login to AI Resume
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded bg-slate-800 text-white outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded bg-slate-800 text-white outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;
