function calculateScore(resumeSkills, roleData) {
    if (!roleData || !roleData.requiredSkills) {
        throw new Error("Role data missing requiredSkills");
    }

    const required = roleData.requiredSkills;

    const matchedSkills = required.filter(skill =>
        resumeSkills.includes(skill)
    );

    const missingSkills = required.filter(skill =>
        !resumeSkills.includes(skill)
    );

    const matchScore = Math.round(
        (matchedSkills.length / required.length) * 100
    );

    return { matchScore, matchedSkills, missingSkills };
}
 module.exports = calculateScore;