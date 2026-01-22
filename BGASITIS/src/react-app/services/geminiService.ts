import { GoogleGenAI } from "@google/genai";

export const startGitaChat = (language: string) => {
  const apiKey = (window as any).ENV?.GEMINI_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = `You are a specialized AI assistant for the "Bhagavad-gītā As It Is" mobile app. 
  Your goal is to help users find slokas (verses) and understand their meaning based on the teachings of ISKCON founder Srila Prabhupada.
  
  Rules:
  1. Respond in ${language === 'NP' ? 'Nepali' : 'English'}.
  2. If a user asks for a topic (e.g., "stress", "karma", "soul"), suggest relevant verses and explain why they apply.
  3. When mentioning a verse, ALWAYS use the format "Chapter.Verse" (e.g., 2.47, 18.66) so the app can detect it.
  4. Be respectful, humble, and spiritually encouraging.
  5. If you don't know a specific verse number, describe the philosophy accurately.`;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });
};

