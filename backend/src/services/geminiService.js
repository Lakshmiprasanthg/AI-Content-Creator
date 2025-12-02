import { getGeminiClient } from '../config/geminiClient.js';

// Using Gemini 2.5 Flash - current stable model
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
  console.log('[GeminiService] Using model:', MODEL_NAME);
  try {
    const model = client.getGenerativeModel({ model: MODEL_NAME });
    console.log('[GeminiService] Sending request to Gemini...');
    const result = await model.generateContent(prompt);
    console.log('[GeminiService] Received response from Gemini');
    console.log('[GeminiService] Response structure:', JSON.stringify(result, null, 2));
    
    // Extract text from response
    const response = result.response;
    const text = response.text();
    
    console.log('[GeminiService] Extracted text length:', text?.length);
    if (!text) {
      console.error('[GeminiService] Empty response from Gemini');
      throw new Error('Empty response from Gemini');
    }
    return text;
  } catch (err) {
    console.error('[GeminiService] Gemini API Error:', err.message);
    console.error('[GeminiService] Error stack:', err.stack);
    console.error('[GeminiService] Error name:', err.name);
    throw new Error(`Failed to generate content: ${err.message}`);
  }
};
