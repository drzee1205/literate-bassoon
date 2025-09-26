import React from 'react';
import { Edit3 } from 'lucide-react';
import { Message } from './Message';
import userAvatar from '../../assets/images/user-avatar.png';

export function UserMessage({ message }) {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit message:', message.id);
  };

  return (
    <Message message={message} avatar={userAvatar} isUser={true}>
      <div className="group/message relative">
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
        
        {/* Edit button */}
        <button
          onClick={handleEdit}
          className="absolute -left-8 top-0 opacity-0 group-hover/message:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
          title="Edit message"
        >
          <Edit3 size={14} className="text-muted-foreground hover:text-foreground" />
        </button>
      </div>
    </Message>
  );
}

