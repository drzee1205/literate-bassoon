import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, RotateCcw } from 'lucide-react';
import { Message } from './Message';
import chatgptLogo from '../../assets/images/chatgpt-logo.png';

export function AIMessage({ message, isLast = false, onRegenerate }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
  };

  return (
    <Message message={message} avatar={chatgptLogo} isUser={false}>
      <div className="group/message relative">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
              
              return !inline && match ? (
                <div className="relative my-4">
                  <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg">
                    <span>{match[1]}</span>
                    <button
                      onClick={() => copyToClipboard(String(children).replace(/\n$/, ''), codeId)}
                      className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                    >
                      <Copy size={14} />
                      {copiedCode === codeId ? 'Copied!' : 'Copy code'}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="!mt-0 !rounded-t-none"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="ml-2">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover/message:opacity-100 transition-opacity">
          <button
            onClick={copyMessage}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
          >
            <Copy size={14} />
            Copy
          </button>
          
          {isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
            >
              <RotateCcw size={14} />
              Regenerate
            </button>
          )}
        </div>
      </div>
    </Message>
  );
}

