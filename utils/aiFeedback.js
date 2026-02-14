const axios = require("axios");

async function generateFeedback(resumeText) {
    try {
        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
            {
                inputs: resumeText,
                parameters: {
                    max_length: 200,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const summary = response.data[0]?.summary_text || "No summary generated.";

        return {
            summary,
            strengths: [],
            missingSkills: [],
            suggestions: [],
            careerAdvice: ""
        };

    } catch (error) {
        console.error("HF FULL ERROR:", error.response?.data || error.message);

        return {
            summary: "AI service temporarily unavailable.",
            strengths: [],
            missingSkills: [],
            suggestions: [],
            careerAdvice: ""
        };
    }
}

module.exports = generateFeedback;
