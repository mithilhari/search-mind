
import { performWebSearch, searchFunctionDefinition } from './webSearchFunction';

// Pre-configured Gemini API key
const GEMINI_API_KEY = 'AIzaSyAbU_rDRkGkpS6QAQR7g6TDPjBTVhfCkEY';

export const searchWithGemini = async (query: string) => {
  const messages = [
    {
      parts: [{
        text: `You are an AI search assistant with access to real-time web search. When users ask about recent events, current data, news, or anything that requires up-to-date information, use the web_search function to get current information before responding.

For questions that don't require current information (like general knowledge, explanations of concepts, etc.), you can answer directly from your training data.

User question: ${query}

Provide a comprehensive, well-structured response. If you use web search, integrate the findings naturally into your answer and cite your sources.`
      }]
    }
  ];

  let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: messages,
      tools: [{
        functionDeclarations: [searchFunctionDefinition]
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

  let data = await response.json();
  
  if (!data.candidates || !data.candidates[0]) {
    throw new Error('Invalid response from Gemini API');
  }

  const candidate = data.candidates[0];
  
  // Check if Gemini wants to call a function
  if (candidate.content?.parts?.[0]?.functionCall) {
    const functionCall = candidate.content.parts[0].functionCall;
    
    if (functionCall.name === 'web_search') {
      // Execute the web search
      const searchArgs = functionCall.args;
      const searchResults = await performWebSearch(searchArgs.query, searchArgs.numResults || 5);
      
      // Send the search results back to Gemini for final response
      messages.push({
        parts: [{
          functionCall: {
            name: 'web_search',
            args: searchArgs
          }
        } as any]
      });
      
      messages.push({
        parts: [{
          functionResponse: {
            name: 'web_search',
            response: searchResults
          }
        } as any]
      });

      // Get final response from Gemini with search results
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages,
          tools: [{
            functionDeclarations: [searchFunctionDefinition]
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

      data = await response.json();
      
      // Extract sources from search results
      const sources = searchResults.results?.map(result => result.url).filter(url => url) || [];
      
      return {
        content: data.candidates[0].content.parts[0].text,
        sources,
      };
    }
  }
  
  // No function call needed, return direct response
  return {
    content: candidate.content.parts[0].text,
    sources: [],
  };
};
