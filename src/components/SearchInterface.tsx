
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchInterfaceProps {
  onSearch: (query: string, apiKey: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && apiKey.trim()) {
      onSearch(query.trim(), apiKey.trim());
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
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            SearchMind
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ask anything, get intelligent answers with real-time information and sources
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative max-w-3xl mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Ask me anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-0"
                />
                <Button
                  type="submit"
                  disabled={!query.trim() || !apiKey.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* API Key Input */}
          {!showApiInput ? (
            <button
              type="button"
              onClick={() => setShowApiInput(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Enter Gemini API Key to continue
            </button>
          ) : (
            <div className="max-w-md mx-auto">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl"
              />
              <p className="text-xs text-slate-400 mt-2">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>
          )}
        </form>

        {/* Example Queries */}
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 mb-4">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-left text-slate-300 hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
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
