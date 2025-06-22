
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
    <div className="min-h-screen p-4 md:p-6 bg-[#0F0F23]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Button
            onClick={onNewSearch}
            variant="ghost"
            className="text-[#C0C5D0] hover:bg-[#1A1B2E] flex items-center gap-2 border border-[#2A2B3F] hover:border-[#20A4F3]"
          >
            <ArrowLeft className="w-4 h-4" />
            New Search
          </Button>
          <h2 className="text-xl md:text-2xl font-bold text-[#C0C5D0]">SearchMind</h2>
        </div>

        {/* Results Container */}
        <div className="bg-[#1A1B2E] border border-[#2A2B3F] rounded-xl shadow-2xl overflow-hidden">
          {/* Content with scroll for large responses */}
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              {/* Show content if available, otherwise show initial loading state */}
              {results.content ? (
                <div className="prose prose-invert prose-lg max-w-none text-[#C0C5D0] leading-relaxed">
                  <ReactMarkdown
                    components={{
                      // Custom styling for markdown elements
                      h1: ({ children }) => (
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 border-b border-[#2A2B3F] pb-2">
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
                        <p className="mb-4 text-[#C0C5D0] leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 text-[#C0C5D0]">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 text-[#C0C5D0]">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-[#C0C5D0] leading-relaxed">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[#20A4F3] pl-4 my-4 italic text-[#C0C5D0] bg-[#0F0F23] py-2 rounded-r">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                          return (
                            <code className="bg-[#0F0F23] text-[#20A4F3] px-2 py-1 rounded text-sm border border-[#2A2B3F]">
                              {children}
                            </code>
                          );
                        }
                        return (
                          <code className="block bg-[#0F0F23] text-[#20A4F3] p-4 rounded-lg overflow-x-auto text-sm border border-[#2A2B3F]">
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="bg-[#0F0F23] p-4 rounded-lg overflow-x-auto mb-4 border border-[#2A2B3F]">
                          {children}
                        </pre>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-[#C0C5D0]">
                          {children}
                        </em>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#20A4F3] hover:text-[#4FC3F7] underline transition-colors"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {results.content}
                  </ReactMarkdown>
                </div>
              ) : (
                /* Initial loading state - similar to ChatGPT's immediate response */
                <div className="flex items-center gap-3 text-[#C0C5D0]">
                  <Loader2 className="w-5 h-5 animate-spin text-[#20A4F3]" />
                  <span className="text-lg">Thinking...</span>
                </div>
              )}
              
              {/* Streaming indicator at the end of content */}
              {results.isStreaming && results.content && (
                <div className="flex items-center gap-2 text-[#20A4F3] mt-4">
                  <div className="w-2 h-5 bg-[#20A4F3] animate-pulse"></div>
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          {results.sources && results.sources.length > 0 && !results.isStreaming && (
            <div className="border-t border-[#2A2B3F] p-6 md:p-8 bg-[#0F0F23]">
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
                    className="p-3 bg-[#1A1B2E] hover:bg-[#2A2B3F] border border-[#2A2B3F] hover:border-[#20A4F3] rounded-lg text-[#C0C5D0] hover:text-white transition-all duration-200 text-sm block truncate"
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
