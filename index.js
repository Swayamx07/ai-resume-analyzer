require("dotenv").config();
const express = require("express");
const cors = require("cors");
const upload = require("./config/multer");

const connectDB = require("./config/db");
const extractTextFromPDF = require("./utils/pdfParser");
const extractSkillsFromText = require("./utils/skillExtractor");
const calculateScore = require("./utils/calculateScore");
const generateFeedback = require("./utils/aiFeedback");

const Resume = require("./models/Resume");
const JobRole = require("./models/JobRole");
const protect = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/api/test", (req, res) => {
    res.send("TEST WORKING");
});

app.get("/api/test-analyze", (req, res) => {
    res.send("Analyze route file is active");
});


app.post(
    "/api/analyze",
    protect,
    upload.single("resume"),
    async (req, res) => {
        try {
            const { role } = req.body;

            const selectedRole = await JobRole.findOne({ title: role });

            if (!selectedRole) {
                return res.status(404).json({ message: "Role not found in database" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "No resume file uploaded" });
            }

            const resumeText = await extractTextFromPDF(req.file.path);
            const resumeSkills = extractSkillsFromText(resumeText);

            const result = calculateScore(resumeSkills, selectedRole);

            let aiFeedback = null;
            try {
                aiFeedback = await generateFeedback(resumeText, role);
            } catch (error) {
                console.log("AI ERROR:", error.message);
            }

            const saved = await Resume.create({
                user: req.user,
                fileName: req.file.originalname,
                detectedSkills: resumeSkills,
                matchScore: result.matchScore,
                role,
                missingSkills: result.missingSkills,
                aiFeedback,
            });

            res.json(saved);
        } catch (error) {
            console.log("ANALYZE ERROR:", error);
            res.status(500).json({ message: "Resume analysis failed" });
        }
    }
);


app.get("/api/resumes", protect, async (req, res) => {
    const resumes = await Resume.find({ user: req.user }).sort({
        createdAt: -1,
    });

    res.json(resumes);
});


app.get("/api/protected", protect, (req, res) => {
    res.json({ message: "Protected data accessed", user: req.user });
});


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
