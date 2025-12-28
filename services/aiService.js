const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeComplaint(description) {
  try {
    // UPDATED: Use a supported stable model like gemini-2.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Analyze the following citizen grievance: "${description}"

      Categorize it into exactly ONE of these departments: 
      [ROADS, ELECTRICITY, WATER_SUPPLY, SANITATION, DRAINAGE, STREET_LIGHTING, PUBLIC_HEALTH, OTHER].

      Determine the urgency: [EMERGENCY, HIGH, MODERATE, LOW].
      
      Return ONLY a JSON object with this exact structure:
      {
        "department": "string",
        "urgency": "string",
        "confidence": number,
        "reason": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown formatting if present
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return {
      department: data.department || "OTHER",
      urgency: data.urgency || "LOW",
      confidence: data.confidence || 0.8,
      reason: data.reason || "AI Analysis completed"
    };
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    return {
      department: "OTHER",
      urgency: "LOW",
      confidence: 0,
      reason: "AI analysis failed due to service error"
    };
  }
}

module.exports = { analyzeComplaint };