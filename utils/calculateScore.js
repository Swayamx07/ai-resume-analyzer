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

    let rawScore = requiredScore + optionalScore;

    // smart ATS scaling
    let matchScore = 0;

    if (rawScore <= 20) {
        matchScore = rawScore + 25;
    }
    else if (rawScore <= 40) {
        matchScore = rawScore + 20;
    }
    else if (rawScore <= 60) {
        matchScore = rawScore + 15;
    }
    else {
        matchScore = rawScore + 10;
    }

    matchScore = Math.min(100, Math.round(matchScore));

    return {
        matchScore,
        matchedSkills: [...matchedRequired, ...matchedOptional],
        missingSkills
    };
}

module.exports = calculateScore;