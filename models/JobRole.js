const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema({
    title: String,
    requiredSkills: [String],
    description: String,
    level: String,
    salaryRange: String,
});


module.exports = mongoose.model("JobRole", jobRoleSchema);
