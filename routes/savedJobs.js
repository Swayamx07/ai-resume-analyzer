const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const SavedJob = require("../models/SavedJob");


// SAVE JOB
router.post("/", protect, async (req, res) => {
    const { title, company, location, link } = req.body;

    const exists = await SavedJob.findOne({
        user: req.user,
        link
    });

    if (exists) {
        return res.json({ msg: "Already saved" });
    }

    const job = await SavedJob.create({
        user: req.user,
        title,
        company,
        location,
        link
    });

    res.json(job);
});


// GET SAVED JOBS
router.get("/", protect, async (req, res) => {
    const jobs = await SavedJob.find({ user: req.user })
        .sort({ createdAt: -1 });

    res.json(jobs);
});


// DELETE (UNSAVE)
router.delete("/:id", protect, async (req, res) => {
    await SavedJob.findByIdAndDelete(req.params.id);
    res.json({ msg: "Removed" });
});

module.exports = router;