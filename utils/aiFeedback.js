async function generateFeedback(resumeText, role) {
    return `
Professional Summary:
Strong candidate for ${role} role.

Improvement Suggestions:
- Improve project depth
- Add measurable achievements
- Include more backend experience

Missing Skills:
- System design
- Advanced testing

Career Advice:
Focus on building production-level projects and deploying them.
`;
}

module.exports = generateFeedback;
