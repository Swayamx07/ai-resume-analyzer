import { useState } from "react";
import axios from "axios";
import Results from "./Results";

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [role, setRole] = useState("Frontend Developer");
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("role", role);

        const res = await axios.post(
            "http://localhost:5000/api/analyze",
            formData
        );

        setResult(res.data);
    };

    const styles = {
        card: {
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        },
        button: {
            marginTop: "15px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
    };


    return (
        <div style={styles.card}>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
            </select>
            <button style={styles.button} onClick={handleSubmit}>
                Analyze Resume
            </button>

            {result && <Results data={result} />}
        </div>
    );
}

export default ResumeUpload;
