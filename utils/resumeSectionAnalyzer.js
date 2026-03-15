function analyzeSections(text) {

    const lower = text.toLowerCase();

    const sections = {
        contact:
            lower.includes("email") ||
            lower.includes("phone") ||
            lower.includes("linkedin"),

        skills: lower.includes("skills"),

        education:
            lower.includes("education") ||
            lower.includes("b.tech") ||
            lower.includes("bachelor"),

        experience:
            lower.includes("experience") ||
            lower.includes("intern"),

        projects:
            lower.includes("project")
    };

    const score =
        (Object.values(sections).filter(Boolean).length / 5) * 100;

    return {
        sections,
        structureScore: Math.round(score)
    };
}

module.exports = analyzeSections;