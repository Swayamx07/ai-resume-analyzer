const jobRoles = require("../data/jobRoles");

function recommendJobs(resumeSkills) {
    const results = jobRoles.map(role => {
        const required = role.requiredSkills;

        const matched = required.filter(skill =>
            resumeSkills.includes(skill)
        );

        const score = Math.round((matched.length / required.length) * 100);

        return {
            role: role.role,
            score,
            matchedSkills: matched,
        };
    });

    return results.sort((a, b) => b.score - a.score);
}

module.exports = recommendJobs;
