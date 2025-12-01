import { GoogleGenerativeAI } from '@google/generative-ai';

let clientInstance = null;

export const getGeminiClient = () => {
  if (!clientInstance) {
    const { GEMINI_API_KEY } = process.env;
    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not set. Gemini generation will fail until provided.');
    }
    clientInstance = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  return clientInstance;
};
