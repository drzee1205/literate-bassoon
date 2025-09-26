import React from 'react';
import { Menu, Settings } from 'lucide-react';

export function Header({ onToggleSidebar, currentChat }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - Menu button and title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="font-medium text-foreground">
            {currentChat?.title || 'ChatGPT'}
          </div>
        </div>
        
        {/* Right side - Settings */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

