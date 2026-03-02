const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateFeedback(resumeText, role) {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant", // <- valid replacement
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: "You are an expert ATS resume analyzer. Return ONLY valid JSON.",
                },
                {
                    role: "user",
                    content: `
Analyze the following resume for the role: ${role}.

Return ONLY valid JSON in this exact format:

{
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "suggestions": [],
  "careerAdvice": ""
}

Rules:
- Summary: short professional overview (3–4 sentences)
- Strengths: key positive aspects
- MissingSkills: important skills missing for the role
- Suggestions: actionable improvements
- CareerAdvice: career growth advice

Resume:
${resumeText.slice(0, 10000)}
        `,
                },
            ],
        });

        const text = completion.choices[0].message.content;

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        return JSON.parse(jsonMatch[0]);

    } catch (error) {
        console.error("GROQ ERROR:", error.message);

        return {
            summary: "AI feedback temporarily unavailable.",
            strengths: [],
            missingSkills: [],
            suggestions: [],
            careerAdvice: "",
        };
    }
}

module.exports = generateFeedback;