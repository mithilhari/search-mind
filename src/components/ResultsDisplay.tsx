
import React from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResult {
  content: string;
  sources?: string[];
  isStreaming?: boolean;
}

interface ResultsDisplayProps {
  results: SearchResult;
  onNewSearch: () => void;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  onNewSearch,
  isLoading,
}) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onNewSearch}
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            New Search
          </Button>
          <h2 className="text-2xl font-bold text-white">SearchMind</h2>
        </div>

        {/* Results Container */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-200 leading-relaxed text-lg">
              {results.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
              {results.isStreaming && (
                <div className="flex items-center gap-2 text-blue-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          {results.sources && results.sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Sources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-slate-300 hover:text-white transition-all duration-200 text-sm"
                  >
                    {source}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
