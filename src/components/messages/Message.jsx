import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';

export function Message({ message, children, avatar, isUser = false }) {
  const [showTimestamp, setShowTimestamp] = useState(false);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`group flex gap-4 message-padding ${isUser ? 'justify-end' : ''}`}
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      {!isUser && (
        <Avatar 
          src={avatar} 
          alt="AI" 
          size="md"
          className="mt-1"
        />
      )}
      
      <div className={`flex-1 ${isUser ? 'max-w-[80%]' : ''}`}>
        <div className={`text-message ${isUser ? 'bg-muted rounded-lg p-3 ml-auto max-w-fit' : ''}`}>
          {children}
        </div>
        
        {showTimestamp && (
          <div className={`text-timestamp mt-1 ${isUser ? 'text-right' : ''}`}>
            {formatTimestamp(message.timestamp)}
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar 
          src={avatar} 
          alt="User" 
          size="md"
          className="mt-1"
        />
      )}
    </div>
  );
}

