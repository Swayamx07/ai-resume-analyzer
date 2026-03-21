const skillsMap = require("../data/skillsMap");

function extractSkillsFromText(text) {
    const detected = new Set();

    const normalized = text.toLowerCase();

    for (let key in skillsMap) {
        const regex = new RegExp(`\\b${key}\\b`, "i");

        if (regex.test(normalized)) {
            detected.add(skillsMap[key]);
        }
    }

    return Array.from(detected);
}

module.exports = extractSkillsFromText;