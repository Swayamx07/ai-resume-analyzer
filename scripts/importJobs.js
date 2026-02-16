require("dotenv").config();
const mongoose = require("mongoose");
const JobRole = require("../models/JobRole");
const jobs = require("../jobs.json");

mongoose.connect(process.env.MONGO_URI);

async function importData() {
    await JobRole.deleteMany();
    await JobRole.insertMany(jobs);
    console.log("Job roles imported successfully");
    process.exit();
}

importData();
