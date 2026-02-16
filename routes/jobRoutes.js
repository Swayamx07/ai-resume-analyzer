const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const recommendJobs = require("../utils/recommendJobs");
const Resume = require("../models/Resume");
const JobRole = require("../models/JobRole");

router.get("/", async (req, res) => {
    try {
        const roles = await JobRole.find().select("title");
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch roles" });
    }
});



router.get("/recommend", protect, async (req, res) => {
    try {
        // Get latest resume of logged-in user
        const latestResume = await Resume.findOne({ user: req.user })
            .sort({ createdAt: -1 });

        // If no resume found
        if (!latestResume) {
            return res.json([]);
        }

        // 3️ Pass detectedSkills to recommendation engine
        const jobs = await recommendJobs(latestResume.detectedSkills);
        res.json(jobs);

    } catch (error) {
        console.error("Job recommendation error:", error);
        res.status(500).json({ message: "Failed to recommend jobs" });
    }
});

module.exports = router;
