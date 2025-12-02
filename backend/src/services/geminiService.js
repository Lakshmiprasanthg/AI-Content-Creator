import { getGeminiClient } from '../config/geminiClient.js';

// Using Gemini 1.5 Flash - works with v1beta API
const MODEL_NAME = 'gemini-1.5-flash';

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
  console.log('[GeminiService] Using model:', MODEL_NAME);
  try {
    const model = client.getGenerativeModel({ model: MODEL_NAME });
    console.log('[GeminiService] Sending request to Gemini...');
    const result = await model.generateContent(prompt);
    console.log('[GeminiService] Received response from Gemini');
    
    // The SDK response structure may vary; adjust extraction as needed:
    const text = result.response?.text?.() || result.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
    if (!text) {
      console.error('[GeminiService] Empty response from Gemini, full response:', JSON.stringify(result));
      throw new Error('Empty response from Gemini');
    }
    return text;
  } catch (err) {
    console.error('[GeminiService] Gemini API Error:', err.message);
    console.error('[GeminiService] Error details:', err);
    throw new Error(`Failed to generate content: ${err.message}`);
  }
};
