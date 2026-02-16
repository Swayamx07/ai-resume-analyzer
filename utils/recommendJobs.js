const JobRole = require("../models/JobRole");

async function recommendJobs(resumeSkills) {
    const roles = await JobRole.find();

    const results = roles.map(role => {
        const required = role.requiredSkills || [];


        const matched = required.filter(skill =>
            resumeSkills.map(s => s.toLowerCase())
                .includes(skill.toLowerCase())
        );


        const score = required.length === 0
            ? 0
            : Math.round((matched.length / required.length) * 100);

        return {
            role: role.title,   // ✅ use title
            score,
            matchedSkills: matched,
        };
    });

    return results.sort((a, b) => b.score - a.score);
}

module.exports = recommendJobs;

