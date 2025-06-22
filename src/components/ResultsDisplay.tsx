
import React from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

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
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Button
            onClick={onNewSearch}
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            New Search
          </Button>
          <h2 className="text-xl md:text-2xl font-bold text-white">SearchMind</h2>
        </div>

        {/* Results Container */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Content with scroll for large responses */}
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  className="text-slate-200 leading-relaxed"
                  components={{
                    // Custom styling for markdown elements
                    h1: ({ children }) => (
                      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 border-b border-white/20 pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-slate-200 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-slate-200">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-200">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-slate-200 leading-relaxed">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-400 pl-4 my-4 italic text-slate-300 bg-white/5 py-2 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded text-sm">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block bg-slate-900 text-green-300 p-4 rounded-lg overflow-x-auto text-sm border border-white/10">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4 border border-white/10">
                        {children}
                      </pre>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-slate-300">
                        {children}
                      </em>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {results.content}
                </ReactMarkdown>
                
                {results.isStreaming && (
                  <div className="flex items-center gap-2 text-blue-400 mt-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sources */}
          {results.sources && results.sources.length > 0 && (
            <div className="border-t border-white/20 p-6 md:p-8 bg-white/5">
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
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-slate-300 hover:text-white transition-all duration-200 text-sm block truncate"
                    title={source}
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
