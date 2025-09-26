import React from 'react';

export function Avatar({ src, alt, className = '', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0 ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
          {alt?.charAt(0)?.toUpperCase() || '?'}
        </div>
      )}
    </div>
  );
}

