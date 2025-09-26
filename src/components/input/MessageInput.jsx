import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

export function MessageInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 8 * 24; // 8 lines * 24px line height
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [message]);

  return (
    <div className="border-t bg-background">
      <div className="max-w-4xl mx-auto input-padding">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 bg-input border border-border rounded-xl p-3">
            {/* File upload button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
            
            {/* Message textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              className="flex-1 resize-none bg-transparent text-input border-none outline-none placeholder:text-muted-foreground min-h-[24px] max-h-[192px]"
              rows={1}
              disabled={disabled}
            />
            
            {/* Send button */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="flex-shrink-0 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Character count or other indicators can go here */}
          <div className="text-xs text-muted-foreground mt-2 text-center">
            ChatGPT can make mistakes. Check important info.
          </div>
        </form>
      </div>
    </div>
  );
}

