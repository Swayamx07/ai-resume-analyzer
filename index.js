const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const PORT = 5000;

// health check route
app.get("/health", (req, res) => {
    res.json({ status: "Server running" });
});

const jobRoles = require("./data/jobRoles");
const calculateScore = require("./utils/scoreCalculator");

app.post("/api/analyze", (req, res) => {

    const resumeSkills = ["javascript", "react", "html", "css"];

    const { role } = req.body;

    const selectedRole = jobRoles.find(
        job => job.role === role
    );

    if (!selectedRole) {
        return res.status(404).json({ message: "Role not found" });
    }

    const result = calculateScore(resumeSkills, selectedRole);

    res.json({
        role: selectedRole.role,
        ...result
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
