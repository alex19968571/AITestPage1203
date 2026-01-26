
import { GoogleGenAI } from "@google/genai";

export const askGemini = async (prompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional travel assistant specialized in Bangkok, Thailand. 
      You are helping a group of friends on a luxury trip. 
      Answer in Traditional Chinese (Taiwan). 
      Be concise, helpful, and provide specific recommendations when asked.
      
      User question: ${prompt}`,
    });

    return response.text || "抱歉，我現在無法回答這個問題。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "發生錯誤，請稍後再試。";
  }
};
