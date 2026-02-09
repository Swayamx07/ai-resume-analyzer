const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateFeedback(resumeText, role) {
    const prompt = `
  You are an expert technical recruiter.

  Analyze this resume text for a ${role} position.

  Provide:
  1. Short professional summary (3-4 lines)
  2. Improvement suggestions
  3. Missing technical skills
  4. Career advice paragraph

  Resume:
  ${resumeText}
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}

module.exports = generateFeedback;
