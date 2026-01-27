function Results({ data }) {
    return (
        <div style={styles.container}>
            <div style={styles.scoreCard}>
                <h2>Match Score</h2>
                <h1>{data.matchScore}%</h1>
            </div>

            <div style={styles.section}>
                <h3>Detected Skills</h3>
                <div style={styles.tags}>
                    {data.detectedSkills.map((skill, i) => (
                        <span key={i} style={styles.good}>{skill}</span>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <h3>Missing Skills</h3>
                <div style={styles.tags}>
                    {data.missingSkills.map((skill, i) => (
                        <span key={i} style={styles.bad}>{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { marginTop: "20px" },
    scoreCard: {
        background: "#e0f2fe",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
    },
    section: { marginTop: "20px" },
    tags: { display: "flex", flexWrap: "wrap", gap: "10px" },
    good: {
        background: "#dcfce7",
        padding: "5px 10px",
        borderRadius: "20px",
    },
    bad: {
        background: "#fee2e2",
        padding: "5px 10px",
        borderRadius: "20px",
    },
};

export default Results;
 