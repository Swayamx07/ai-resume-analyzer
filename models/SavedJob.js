const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: String,
    company: String,
    location: String,
    link: String
}, { timestamps: true });

module.exports = mongoose.model("SavedJob", savedJobSchema);