const express = require("express");
const cors = require("cors");
const upload = require("./config/multer");
const extractTextFromPDF = require("./utils/pdfParser");
const extractSkillsFromText = require("./utils/skillExtractor");
const jobRoles = require("./data/jobRoles");

const app = express();

require("dotenv").config();
const connectDB = require("./config/db");
connectDB();


// middleware
app.use(cors());
app.use(express.json());

const PORT = 5000;

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// health check route
app.get("/health", (req, res) => {
    res.json({ status: "Server running" });
});

const Resume = require("./models/Resume");
const protect = require("./middleware/authMiddleware");
const calculateScore = require("./utils/calculateScore");
const generateFeedback = require("./utils/aiFeedback");



app.post("/api/analyze", protect, upload.single("resume"), async (req, res) => {
    try {
        const { role } = req.body;

        const selectedRole = jobRoles.find(job => job.role === role);
        if (!selectedRole) return res.status(404).json({ message: "Role not found" });


        const aiFeedback = await generateFeedback(resumeText, role);
        const resumeText = await extractTextFromPDF(req.file.path);
        const resumeSkills = extractSkillsFromText(resumeText);
        const result = calculateScore(resumeSkills, selectedRole);

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
        console.log(error);
        console.log("ANALYZE ERROR:", error);
        res.status(500).json({ message: "Resume analysis failed" });
    }
});

app.get("/api/resumes", protect, async (req, res) => {
    const resumes = await Resume.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(resumes);
});

app.get("/api/protected", protect, (req, res) => {
    res.json({ message: "Protected data accessed", user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
