const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const recommendJobs = require("../utils/recommendJobs");

const Resume = require("../models/Resume");

router.get("/recommend", protect, async (req, res) => {
    try {
        const latestResume = await Resume.findOne({ user: req.user })
            .sort({ createdAt: -1 });

        if (!latestResume) {
            return res.json([]);
        }

        const jobs = recommendJobs(latestResume.detectedSkills);

        res.json(jobs);

    } catch (error) {
        console.log("Job recommend error:", error);
        res.status(500).json({ message: "Failed to recommend jobs" });
    }
});


module.exports = router;
