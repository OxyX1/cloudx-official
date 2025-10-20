
import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { GeminiIcon } from './icons';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MODELS } from '../constants';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.sender === Sender.User;
  
  const model = message.modelId ? MODELS.find(m => m.id === message.modelId) : null;
  const icon = model ? model.icon : <GeminiIcon />;

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-700 flex items-center justify-center mt-1">
          {icon}
        </div>
      )}
      <div 
        className={`
          max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl px-5 py-3
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-lg' 
            : 'bg-gray-700 text-gray-200 rounded-bl-lg'
          }
        `}
      >
        {isLoading ? (
             <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            </div>
        ) : (
          <MarkdownRenderer content={message.text} />
        )}
      </div>
    </div>
  );
};
