require("dotenv").config();
const mongoose = require("mongoose");
const csv = require("csvtojson");
const path = require("path");
const JobRole = require("../models/JobRole");

mongoose.connect(process.env.MONGO_URI);

async function importCSV() {
    try {
        const filePath = path.join(__dirname, "../IT_Job_Roles_Skills.csv");

        const jsonArray = await csv().fromFile(filePath);


        const formatted = jsonArray.map(item => ({
            title: item["Job Title"],
            requiredSkills: item.Skills
                ? item.Skills.split(",").map(s => s.trim().toLowerCase())
                : [],
            description: item.Description || "",
            level: item.Level || "",
            salaryRange: item.Salary || ""
        }));

        await JobRole.deleteMany();
        await JobRole.insertMany(formatted);

        console.log(`Imported ${formatted.length} job roles`);
        process.exit(0);
    } catch (err) {
        console.error(" CSV import failed:", err);
        process.exit(1);
    }
}

importCSV();
