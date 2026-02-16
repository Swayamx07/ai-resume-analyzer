function calculateScore(resumeSkills, roleData) {
    const required = roleData.requiredSkills || [];

    const matchedSkills = required.filter(skill =>
        resumeSkills
            .map(s => s.toLowerCase())
            .includes(skill.toLowerCase())
    );

    const missingSkills = required.filter(skill =>
        !resumeSkills
            .map(s => s.toLowerCase())
            .includes(skill.toLowerCase())
    );

    const matchScore = required.length === 0
        ? 0
        : Math.round((matchedSkills.length / required.length) * 100);

    return { matchScore, matchedSkills, missingSkills };
}

module.exports = calculateScore;
