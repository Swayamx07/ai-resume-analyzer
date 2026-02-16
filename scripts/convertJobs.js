const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("IT_Job_Roles_Skills.csv")
    .pipe(csv())
    .on("data", (row) => {
        results.push({
            title: row.Job_Role.trim(),
            requiredSkills: row.Skills
                .split(",")
                .map(skill => skill.trim().toLowerCase()),
        });
    })
    .on("end", () => {
        fs.writeFileSync("jobs.json", JSON.stringify(results, null, 2));
        console.log("jobs.json created");
    });
