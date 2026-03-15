function calculateScore(resumeSkills, roleData) {

    const required = roleData.requiredSkills || [];
    const optional = roleData.optionalSkills || [];

    const resume = resumeSkills.map(s => s.toLowerCase());

    const matchedRequired = required.filter(skill =>
        resume.includes(skill.toLowerCase())
    );

    const matchedOptional = optional.filter(skill =>
        resume.includes(skill.toLowerCase())
    );

    const missingSkills = required.filter(skill =>
        !resume.includes(skill.toLowerCase())
    );

    // weighted ATS style scoring
    const requiredWeight = 80;
    const optionalWeight = 20;

    const requiredScore =
        required.length === 0
            ? 0
            : (matchedRequired.length / required.length) * requiredWeight;

    const optionalScore =
        optional.length === 0
            ? 0
            : (matchedOptional.length / optional.length) * optionalWeight;

    const matchScore = Math.round(requiredScore + optionalScore);

    return {
        matchScore,
        matchedSkills: [...matchedRequired, ...matchedOptional],
        missingSkills
    };
}

module.exports = calculateScore;