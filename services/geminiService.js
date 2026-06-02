import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function reviewResume(resumeText) {
 const prompt = `
You are a senior ATS and HR specialist.

Analyze the resume carefully.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "summary": "",
  "skillsFound": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "recommendedProjects": []
}

Rules:
- ATS score must be between 0 and 100.
- Summary should be 2-3 sentences.
- Skills should be technical skills only.
- Suggestions should be actionable.
- RecommendedProjects should be relevant to the candidate's profile.

Resume:
${resumeText}
`;

  const response = await generateWithRetry(prompt);

 const text = response.text;


const jsonMatch = text.match(/\{[\s\S]*\}/);

if (!jsonMatch) {
  throw new Error(
    "Gemini returned invalid JSON"
  );
}
return JSON.parse(jsonMatch[0]);
}

async function generateWithRetry(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response;
    } catch (error) {
      if (
        error?.message?.includes("503") &&
        i < retries - 1
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (i + 1))
        );
        continue;
      }

      throw error;
    }
  }
}