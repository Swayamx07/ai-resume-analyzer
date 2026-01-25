const express = require("express");
const cors = require("cors");
const upload = require("./config/multer");
const extractTextFromPDF = require("./utils/pdfParser");
const extractSkillsFromText = require("./utils/skillExtractor");


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

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
    try {
        const { role } = req.body;
        const selectedRole = jobRoles.find(
            job => job.role === role
        );

        if (!selectedRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        const resumeText = await extractTextFromPDF(req.file.path);
        const resumeSkills = extractSkillsFromText(resumeText);

        const result = calculateScore(resumeSkills, selectedRole);

        res.json({
            role: selectedRole.role,
            detectedSkills: resumeSkills,
            ...result
        });
    } catch (error) {
        res.status(500).json({ message: "Resume analysis failed" });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
