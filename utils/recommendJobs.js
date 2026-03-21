const JobRole = require("../models/JobRole");

async function recommendJobs(resumeSkills) {

    if (!resumeSkills || resumeSkills.length === 0) {
        return [];
    }

    const roles = await JobRole.find();

    const normalizedResumeSkills =
        resumeSkills.map(s => s.toLowerCase());

    const results = roles.map(role => {

        const required = role.requiredSkills || [];

        const normalizedRequired =
            required.map(s => s.toLowerCase());

        const matched =
            normalizedRequired.filter(skill =>
                normalizedResumeSkills.includes(skill)
            );

        const score =
            required.length === 0
                ? 0
                : Math.round(
                    (matched.length / required.length) * 100
                );

        return {
            title: role.title,
            score,
            matchedSkills: matched,
            description: role.description,
            salaryRange: role.salaryRange
        };
    });

    return results
        .filter(job => job.score >= 20)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);
}

module.exports = recommendJobs;