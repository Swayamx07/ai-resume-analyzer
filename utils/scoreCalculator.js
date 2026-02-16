function calculateScore(resumeSkills, jobRole) {
    const required = jobRole.required;
    const optional = jobRole.optional;

    const matchedRequired = required.filter(skill =>
        resumeSkills.includes(skill)
    );

    const matchedOptional = optional.filter(skill =>
        resumeSkills.includes(skill)
    );

    const requiredScore =
        (matchedRequired.length / required.length) * 70;

    const optionalScore =
        (matchedOptional.length / optional.length) * 30;

    const matchScore = Math.round(requiredScore + optionalScore);

    const missingSkills = required.filter(
        skill => resumeSkills.some(s =>
            s.toLowerCase().includes(skill.toLowerCase())
        )
    );

    return {
        matchScore,
        matchedSkills: [...matchedRequired, ...matchedOptional],
        missingSkills
    };
}

module.exports = calculateScore;
