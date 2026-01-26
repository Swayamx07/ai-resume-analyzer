function Results({ data }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Match Score: {data.matchScore}%</h2>

            <h3>Detected Skills</h3>
            <ul>
                {data.detectedSkills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                ))}
            </ul>

            <h3>Missing Skills</h3>
            <ul>
                {data.missingSkills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

export default Results;

