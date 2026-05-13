function calculateScore(resumeSkills, roleData, resumeText) {

    const required = roleData.requiredSkills || [];
    const optional = roleData.optionalSkills || [];

    const resume = resumeSkills.map(s => s.toLowerCase());
    const lowerResume = resumeText.toLowerCase();

    const matchedRequired = required.filter(skill =>
        resume.some(r =>
            r.includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(r)
        )
    );

    const matchedOptional = optional.filter(skill =>
        resume.some(r =>
            r.includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(r)
        )
    );

    const missingSkills = required.filter(skill =>
        !resume.some(r =>
            r.includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(r)
        )
    );

    // ---------- NEW SCORING ----------

    let matchScore = 0;

    // Required skills scoring
    const requiredRatio =
        required.length === 0
            ? 0
            : matchedRequired.length / required.length;

    // Optional skills scoring
    const optionalRatio =
        optional.length === 0
            ? 0
            : matchedOptional.length / optional.length;

    // Base ATS score
    matchScore += 25;

    // Required contributes heavily
    matchScore += requiredRatio * 55;

    // Optional contributes lightly
    matchScore += optionalRatio * 20;

    // Bonus for many detected resume skills
    if (resumeSkills.length >= 10) {
        matchScore += 5;
    }

    if (
        lowerResume.includes("project") ||
        lowerResume.includes("internship") ||
        lowerResume.includes("experience")
    ) {
        matchScore += 5;
    }

    // Bonus if resume has projects/experience
    if (
        resume.includes("project") ||
        resume.includes("internship") ||
        resume.includes("experience")
    ) {
        matchScore += 5;
    }

    matchScore = Math.min(100, Math.round(matchScore));

    return {
        matchScore,
        matchedSkills: [...matchedRequired, ...matchedOptional],
        missingSkills
    };
}

module.exports = calculateScore;