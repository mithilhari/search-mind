// Web search function that Gemini can call
export const performWebSearch = async (query: string, numResults: number = 5) => {
  try {
    // Using a free search API - you can replace with Google Custom Search, Bing, etc.
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    
    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format results for Gemini
    const results = data.RelatedTopics?.slice(0, numResults).map((topic: any, index: number) => ({
      title: topic.Text?.split(' - ')[0] || `Result ${index + 1}`,
      snippet: topic.Text || 'No description available',
      url: topic.FirstURL || '',
    })) || [];

    return {
      results,
      query,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Web search error:', error);
    return {
      results: [],
      query,
      error: 'Failed to perform web search',
      timestamp: new Date().toISOString(),
    };
  }
};

// Function definitions for Gemini function calling
export const searchFunctionDefinition = {
  name: "web_search",
  description: "Search the web for current information when the user asks about recent events, news, current data, or when you need up-to-date information to answer their question accurately.",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query to find current information"
      },
      numResults: {
        type: "integer",
        description: "Number of search results to return (default: 5)",
        minimum: 1,
        maximum: 10,
        default: 5
      }
    },
    required: ["query"]
  }
};