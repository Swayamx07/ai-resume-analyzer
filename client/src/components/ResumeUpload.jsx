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

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
            </select>
            <button onClick={handleSubmit}>Analyze</button>

            {result && <Results data={result} />}
        </div>
    );
}

export default ResumeUpload;
