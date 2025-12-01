import { getGeminiClient } from '../config/geminiClient.js';

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Generate content from Gemini given a prompt.
 * @param {string} prompt
 * @returns {Promise<string>} generated text
 */
export const generateContent = async (prompt) => {
  if (!prompt || !prompt.trim()) {
    throw new Error('Prompt is required');
  }
  const client = getGeminiClient();
  try {
    const model = client.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    // The SDK response structure may vary; adjust extraction as needed:
    const text = result.response?.text?.() || result.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
    if (!text) {
      throw new Error('Empty response from Gemini');
    }
    return text;
  } catch (err) {
    console.error('Gemini generation error:', err.message);
    throw new Error('Failed to generate content');
  }
};
