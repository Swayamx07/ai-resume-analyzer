const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateFeedback(resumeText, role) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
        });

        const prompt = `
You are an expert ATS resume analyzer.

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
${resumeText.slice(0, 12000)}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON safely
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return parsed;

    } catch (error) {
        console.error("GEMINI ERROR:", error.message);

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