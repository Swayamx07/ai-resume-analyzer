const skillsMap = require("../data/skillsMap");

function extractSkillsFromText(text) {
    const detected = new Set();

    const normalized = text
        .toLowerCase()
        .replace(/[\n\r]/g, " ")
        .replace(/[^\w\s.+#-]/g, " ")
        .replace(/\s+/g, " ");

    for (let key in skillsMap) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(
            `(^|\\s|,|\\.|-|\\/|\\()${escapedKey}(\\s|,|\\.|-|\\/|\\)|$)`,
            "i"
        );

        if (regex.test(normalized)) {
            detected.add(skillsMap[key]);
        }
    }


    return Array.from(detected);
}

module.exports = extractSkillsFromText;