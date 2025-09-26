import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const {
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
  } = useChat();

  const { theme } = useTheme();
  const groupedChats = groupChatsByDate();

  return (
    <div className={`font-sohne ${theme}`}>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={createNewChat}
          onSelectChat={selectChat}
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          groupedChats={groupedChats}
        />
        
        <MainContent
          currentChat={currentChat}
          messages={messages}
          onSendMessage={sendMessage}
          onToggleSidebar={toggleSidebar}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
