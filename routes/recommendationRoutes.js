const express = require("express");
const Resume = require("../models/Resume");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
    const latest = await Resume.findOne({ user: req.user })
        .sort({ createdAt: -1 });

    if (!latest) {
        return res.json({ jobs: [] });
    }

    res.json({ jobs: latest.recommendedJobs || [] });
});

module.exports = router;