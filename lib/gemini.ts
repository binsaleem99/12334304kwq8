
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a website structure suggestion using Gemini 3 Pro.
 * Adheres to the latest @google/genai guidelines.
 */
export const generateWebsiteStructure = async (prompt: string) => {
  // Always initialize with the pre-configured API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        {
          role: "user",
          parts: [{ text: `بناءً على هذا الوصف للموقع: "${prompt}"، اقترح هيكلاً للموقع (أقسام، ألوان، محتوى أساسي باللغة العربية). اجعل الاستجابة موجزة ومركزة على العناصر المرئية والمحتوى.` }]
        }
      ],
      config: {
        systemInstruction: "أنت خبير في تصميم المواقع وتجربة المستخدم، متخصص في السوق الخليجي والعربي. تساعد المستخدمين في بناء مواقعهم بالذكاء الاصطناعي.",
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });

    // Directly access .text property as per guidelines
    return response.text || "لم نتمكن من الحصول على رد من الذكاء الاصطناعي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء معالجة طلبك. سنقوم بإنشاء هيكل افتراضي لك.";
  }
};
