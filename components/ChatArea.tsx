
import React, { useRef, useEffect } from 'react';
import type { AIModel, Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { PromptInput } from './PromptInput';
import { Sender } from '../types';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
  model: AIModel;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage, isLoading, error, model }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-800/50">
      <header className="flex items-center gap-3 p-4 border-b border-gray-700/50 bg-gray-900/30">
        <div className="w-8 h-8 flex items-center justify-center">{model.icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{model.name}</h2>
          <p className="text-sm text-gray-400">by {model.provider}</p>
        </div>
      </header>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <h3 className="text-2xl font-semibold">AI Model Playground</h3>
            <p>Start a conversation with {model.name}.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        )}
        {isLoading && messages[messages.length-1]?.sender === Sender.User && (
            <ChatMessage message={{sender: Sender.AI, text: '...', modelId: model.id}} isLoading={true}/>
        )}
      </div>

      {error && (
        <div className="px-6 py-2 text-red-400 bg-red-900/30 border-t border-red-500/30">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      <div className="p-6 bg-gray-900/30 border-t border-gray-700/50">
        <PromptInput onSend={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
