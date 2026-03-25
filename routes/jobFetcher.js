const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const axios = require("axios");

router.get("/real", protect, async (req, res) => {
    try {
        const latest = await Resume.findOne({ user: req.user })
            .sort({ createdAt: -1 });

        if (!latest) {
            return res.json({ jobs: [] });
        }

        const skills = latest.detectedSkills.join(" ");
        const location = "India";

        const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_ID}&app_key=${process.env.ADZUNA_KEY}&what=${skills}&where=${location}`;

        const response = await axios.get(url);

        const jobs = response.data.results.map(job => ({
            title: job.title,
            company: job.company.display_name,
            location: job.location.display_name,
            link: job.redirect_url
        }));

        res.json({ jobs });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Job Fetch Failed" });
    }
});

module.exports = router;