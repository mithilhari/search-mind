
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchInterfaceProps {
  onSearch: (query: string, apiKey?: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('perplexity-api-key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (apiKey) {
        localStorage.setItem('perplexity-api-key', apiKey);
        onSearch(query.trim(), apiKey);
      } else {
        onSearch(query.trim());
      }
    }
  };

  const exampleQueries = [
    "What are the latest developments in AI?",
    "Explain quantum computing in simple terms",
    "What's happening in the stock market today?",
    "How does climate change affect ocean currents?"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-[#1FB6FF] to-[#00D4AA] rounded-2xl shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#1FB6FF] via-[#00D4AA] to-[#FF6B6B] bg-clip-text text-transparent mb-4">
            SearchMind
          </h1>
          <p className="text-xl text-[#E5E7EB] max-w-2xl mx-auto">
            Ask anything, get intelligent answers with real-time information and sources
          </p>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-[#2D2D30]/70 backdrop-blur-sm border border-[#3E3E40] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#E5E7EB]">Enable Real-time Web Search</h3>
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(false)}
                  className="text-xs text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                >
                  Use Gemini Instead
                </button>
              </div>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Perplexity API key..."
                className="w-full bg-[#1C1C1E] border-[#3E3E40] text-white placeholder-[#6B7280] focus:border-[#1FB6FF] mb-2"
              />
              <p className="text-xs text-[#9CA3AF]">
                Get your API key from{' '}
                <a 
                  href="https://www.perplexity.ai/settings/api" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#1FB6FF] hover:underline"
                >
                  Perplexity Settings
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative max-w-3xl mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1FB6FF]/20 to-[#00D4AA]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-[#2D2D30] backdrop-blur-sm border border-[#3E3E40] rounded-2xl p-2">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-[#9CA3AF] ml-4" />
                <Input
                  type="text"
                  placeholder={apiKey ? "Ask anything with real-time web data..." : "Ask me anything..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder-[#6B7280] text-lg focus:outline-none focus:ring-0"
                />
                <Button
                  type="submit"
                  disabled={!query.trim()}
                  className="bg-gradient-to-r from-[#1FB6FF] to-[#00D4AA] hover:from-[#1A9BE0] hover:to-[#00B894] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {apiKey ? "Search Live" : "Search"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Toggle API Key Input */}
          {!showApiKeyInput && !apiKey && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowApiKeyInput(true)}
                className="text-sm text-[#1FB6FF] hover:text-[#00D4AA] transition-colors underline"
              >
                + Add Perplexity API key for real-time web search
              </button>
            </div>
          )}
        </form>

        {/* Example Queries */}
        <div className="max-w-4xl mx-auto">
          <p className="text-[#9CA3AF] mb-4">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="p-4 bg-[#2D2D30]/50 hover:bg-[#2D2D30] border border-[#3E3E40] hover:border-[#1FB6FF]/50 rounded-xl text-left text-[#E5E7EB] hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-[#6B7280] group-hover:text-[#1FB6FF] transition-colors" />
                  <span>{example}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
