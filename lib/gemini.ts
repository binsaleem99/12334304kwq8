import { GoogleGenAI } from "@google/genai";

// Standard initialization using process.env.API_KEY as per guidelines
export const generateWebsiteStructure = async (prompt: string) => {
  // Fix: Strictly following the initialization guideline for GoogleGenAI
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Fix: Upgraded to gemini-3-pro-preview for complex reasoning task (website structure design)
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `بناءً على هذا الوصف للموقع: "${prompt}"، اقترح هيكلًا للموقع (أقسام، ألوان، محتوى أساسي باللغة العربية). اجعل الاستجابة موجزة ومركزة على العناصر المرئية والمحتوى.`,
      config: {
        systemInstruction: "أنت خبير في تصميم المواقع وتجربة المستخدم، متخصص في السوق الخليجي والعربي. تساعد المستخدمين في بناء مواقعهم بالذكاء الاصطناعي.",
      }
    });

    // Fix: Correctly extracting text property from response
    return response.text || "لم نتمكن من الحصول على رد من الذكاء الاصطناعي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء معالجة طلبك. سنقوم بإنشاء هيكل افتراضي لك.";
  }
};