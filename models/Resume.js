const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        fileName: String,

        detectedSkills: [String],

        matchScore: Number,

        role: String,

        missingSkills: [String],

        aiFeedback: {
            type: String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);

