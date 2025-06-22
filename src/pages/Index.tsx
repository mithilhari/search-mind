
import React, { useState } from 'react';
import SearchInterface from '../components/SearchInterface';
import ResultsDisplay from '../components/ResultsDisplay';
import { searchWithGemini } from '../utils/geminiClient';

interface SearchResult {
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

const Index = () => {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string, apiKey: string) => {
    setIsLoading(true);
    
    // Immediately show the results container with loading state - like ChatGPT
    setResults({ 
      content: '', 
      isStreaming: true,
      sources: []
    });

    try {
      // Small delay to simulate thinking time before response begins
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await searchWithGemini(query, apiKey);
      
      // Stream the response character by character with variable speed
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < response.content.length) {
          // Variable chunk size for more natural streaming
          const chunkSize = Math.floor(Math.random() * 3) + 1; // 1-3 characters
          const chunk = response.content.slice(0, currentIndex + chunkSize);
          
          setResults({
            content: chunk,
            sources: response.sources,
            isStreaming: true,
          });
          
          currentIndex += chunkSize;
        } else {
          clearInterval(streamInterval);
          setResults({
            content: response.content,
            sources: response.sources,
            isStreaming: false,
          });
          setIsLoading(false);
        }
      }, 30); // Faster streaming interval for smoother effect

    } catch (error) {
      console.error('Search error:', error);
      setResults({
        content: 'Sorry, there was an error processing your search. Please check your API key and try again.',
        isStreaming: false,
      });
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResults(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10">
        {!results ? (
          <SearchInterface onSearch={handleSearch} />
        ) : (
          <ResultsDisplay 
            results={results} 
            onNewSearch={handleNewSearch}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
