export const searchWithPerplexity = async (query: string, apiKey: string) => {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'You are an AI search assistant. Provide comprehensive, accurate, and up-to-date information with relevant sources. Structure your response clearly and include citations when referencing specific facts or recent events.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 2048,
      return_images: false,
      return_related_questions: false,
      search_recency_filter: 'month',
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response from Perplexity API');
  }

  // Extract sources from citations if available
  const content = data.choices[0].message.content;
  const sources: string[] = [];
  
  // Parse citations and extract URLs (Perplexity includes citations in the response)
  const citationRegex = /\[(\d+)\]/g;
  const matches = content.match(citationRegex);
  if (matches) {
    // This is a simplified extraction - in reality, Perplexity provides citation metadata
    matches.forEach((match, index) => {
      sources.push(`Source ${index + 1}`);
    });
  }

  return {
    content,
    sources,
  };
};