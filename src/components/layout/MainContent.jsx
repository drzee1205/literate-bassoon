import React, { useEffect, useRef } from 'react';
import { Header } from './Header';
import { AIMessage } from '../messages/AIMessage';
import { UserMessage } from '../messages/UserMessage';
import { MessageInput } from '../input/MessageInput';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function MainContent({ 
  currentChat,
  messages, 
  onSendMessage, 
  onToggleSidebar,
  isLoading 
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleRegenerate = () => {
    // TODO: Implement regenerate functionality
    console.log('Regenerate last response');
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <Header 
        onToggleSidebar={onToggleSidebar}
        currentChat={currentChat}
      />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="main-content-max mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">How can I help you today?</h1>
                <p className="text-muted-foreground">
                  Start a conversation by typing a message below.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((message, index) => (
                <div key={message.id}>
                  {message.type === 'user' ? (
                    <UserMessage message={message} />
                  ) : (
                    <AIMessage 
                      message={message} 
                      isLast={index === messages.length - 1}
                      onRegenerate={handleRegenerate}
                    />
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="message-padding">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
                    </div>
                    <div className="flex-1">
                      <LoadingSpinner />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      
      {/* Input Area */}
      <MessageInput 
        onSendMessage={onSendMessage}
        disabled={isLoading}
      />
    </div>
  );
}

