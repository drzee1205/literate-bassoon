import React from 'react';
import { Plus, MessageSquare, Settings, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function Sidebar({ 
  chats, 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  isOpen, 
  onClose,
  groupedChats 
}) {
  const { theme, toggleTheme } = useTheme();

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const ChatGroup = ({ title, chats, showTitle = true }) => {
    if (chats.length === 0) return null;

    return (
      <div className="mb-4">
        {showTitle && (
          <div className="text-xs font-medium text-muted-foreground mb-2 px-3">
            {title}
          </div>
        )}
        <div className="space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sidebar hover-chatgpt transition-colors group ${
                currentChatId === chat.id ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={16} className="flex-shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="truncate">
                    {chat.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        sidebar-width bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <ChatGroup title="Today" chats={groupedChats.today} />
          <ChatGroup title="Yesterday" chats={groupedChats.yesterday} />
          <ChatGroup title="Last 7 Days" chats={groupedChats.lastWeek} />
          <ChatGroup title="Older" chats={groupedChats.older} />
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 text-sidebar hover-chatgpt rounded-lg transition-colors"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          
          {/* Settings */}
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sidebar hover-chatgpt rounded-lg transition-colors">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          
          {/* User Profile */}
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sidebar hover-chatgpt rounded-lg transition-colors">
            <User size={16} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </>
  );
}

