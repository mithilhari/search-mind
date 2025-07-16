
// Pre-configured Gemini API key
const GEMINI_API_KEY = 'AIzaSyAbU_rDRkGkpS6QAQR7g6TDPjBTVhfCkEY';

export const searchWithGemini = async (query: string) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are an AI search assistant similar to Perplexity. Answer the following question with detailed, accurate, and up-to-date information. Provide comprehensive explanations and include relevant context. If you mention specific facts, data, or recent events, try to be as accurate as possible.

Question: ${query}

Please provide a thorough, well-structured response that directly answers the question.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('Invalid response from Gemini API');
  }

  return {
    content: data.candidates[0].content.parts[0].text,
    sources: [], // Gemini doesn't provide sources directly, but we could enhance this
  };
};
