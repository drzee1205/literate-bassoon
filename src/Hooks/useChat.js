import { useState, useEffect } from 'react';
import sampleData from '../assets/sample_data.json';

export function useChat() {
  const [chats, setChats] = useState(sampleData.chats);
  const [currentChatId, setCurrentChatId] = useState(sampleData.currentChatId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      timestamp: new Date().toISOString(),
      messages: []
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    // Add user message
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ));

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date().toISOString()
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, aiMessage],
              title: chat.messages.length === 0 ? content.slice(0, 50) + '...' : chat.title
            }
          : chat
      ));

      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      `I understand you're asking about "${userInput}". This is a great question! Let me provide you with a comprehensive response.

## Key Points

Here are the main aspects to consider:

1. **Understanding the Context**: Your question touches on important concepts that are worth exploring in detail.

2. **Practical Applications**: There are several ways this applies to real-world scenarios.

3. **Best Practices**: Following established guidelines can help ensure success.

## Example Code

\`\`\`javascript
// Example implementation
function handleUserInput(input) {
  return processInput(input);
}
\`\`\`

Would you like me to elaborate on any specific aspect of this topic?`,

      `That's an excellent question about "${userInput}"! Let me break this down for you.

## Overview

This topic involves several interconnected concepts that work together to create a comprehensive solution.

## Step-by-Step Approach

1. **Initial Setup**: Start by establishing the foundation
2. **Implementation**: Build upon the basics with advanced features
3. **Testing**: Ensure everything works as expected
4. **Optimization**: Fine-tune for better performance

## Additional Resources

- Documentation and guides
- Community best practices
- Real-world examples

Is there a particular aspect you'd like me to focus on?`,

      `Great question! "${userInput}" is something many people wonder about. Here's what you need to know:

## The Basics

Understanding the fundamentals is crucial for getting started. This involves learning the core concepts and how they relate to each other.

## Advanced Concepts

Once you have the basics down, you can explore more sophisticated approaches:

\`\`\`python
# Example Python code
def advanced_function(parameter):
    result = process_data(parameter)
    return optimize_result(result)
\`\`\`

## Common Pitfalls

- Avoid rushing through the learning process
- Don't skip the fundamentals
- Always test your implementations

Feel free to ask follow-up questions if you need clarification on anything!`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const groupChatsByDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [],
      yesterday: [],
      lastWeek: [],
      older: []
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.timestamp);
      const chatDay = new Date(chatDate.getFullYear(), chatDate.getMonth(), chatDate.getDate());

      if (chatDay.getTime() === today.getTime()) {
        groups.today.push(chat);
      } else if (chatDay.getTime() === yesterday.getTime()) {
        groups.yesterday.push(chat);
      } else if (chatDate >= lastWeek) {
        groups.lastWeek.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  return {
    chats,
    currentChatId,
    currentChat,
    messages,
    sidebarOpen,
    isLoading,
    createNewChat,
    selectChat,
    sendMessage,
    toggleSidebar,
    groupChatsByDate
  };
}

