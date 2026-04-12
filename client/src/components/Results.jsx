import { Pie } from "react-chartjs-2";

const skillData = categorizeSkills(result.detectedSkills);

const chartData = {
    labels: ["Frontend", "Backend", "DevOps", "Other"],
    datasets: [
        {
            data: Object.values(skillData),
        }
    ]
};
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
            <div className="bg-[#111114] p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg mb-3">Skill Distribution</h3>
                <Pie data={chartData} />
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
