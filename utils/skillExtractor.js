const skillsMap = require("../data/skillsMap");

function extractSkillsFromText(text) {
    const detectedSkills = new Set();

    for (let key in skillsMap) {
        if (text.includes(key)) {
            detectedSkills.add(skillsMap[key]);
        }
    }

    return Array.from(detectedSkills);
}

module.exports = extractSkillsFromText;
