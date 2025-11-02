import React, { useState, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import type { Message, ModelId } from './types';
import { Sender } from './types';
import { MODELS } from './constants';
import { getChatStream } from './services/geminiService';

export default function App(): React.ReactElement {
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(MODELS.find(m => m.enabled)?.id || MODELS[0].id);
  const [messagesByModel, setMessagesByModel] = useState<Record<ModelId, Message[]>>(() => {
    const initialState: Record<ModelId, Message[]> = {} as Record<ModelId, Message[]>;
    MODELS.forEach(model => {
      initialState[model.id] = [];
    });
    return initialState;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatSessions = useRef<Map<ModelId, Chat>>(new Map());

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    const currentModel = MODELS.find(m => m.id === selectedModelId);
    if (!currentModel || !currentModel.enabled) {
      setError("Please select an enabled model.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    const userMessage: Message = { sender: Sender.User, text: prompt };
    const updatedHistory = [...messagesByModel[selectedModelId], userMessage];
    
    setMessagesByModel(prev => ({
      ...prev,
      [selectedModelId]: updatedHistory,
    }));

    try {
      const stream = await getChatStream(chatSessions.current, selectedModelId, currentModel.modelName, updatedHistory);

      let aiResponseText = '';
      const aiMessage: Message = { sender: Sender.AI, text: '', modelId: selectedModelId };
      
      setMessagesByModel(prev => ({
        ...prev,
        [selectedModelId]: [...prev[selectedModelId], aiMessage],
      }));
      
      for await (const chunk of stream) {
        if (chunk && typeof chunk.text === 'string') {
          aiResponseText += chunk.text;
          setMessagesByModel(prev => ({
            ...prev,
            [selectedModelId]: prev[selectedModelId].map((msg, index) => 
              index === prev[selectedModelId].length - 1 
              ? { ...msg, text: aiResponseText } 
              : msg
            ),
          }));
        }
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      const errorResponseMessage: Message = { sender: Sender.AI, text: `Sorry, I encountered an error: ${errorMessage}`, modelId: selectedModelId };
       setMessagesByModel(prev => ({
        ...prev,
        [selectedModelId]: [...prev[selectedModelId].slice(0,-1), errorResponseMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  }, [selectedModelId, messagesByModel]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        models={MODELS}
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
      />
      <main className="flex-1 flex flex-col">
        <ChatArea
          messages={messagesByModel[selectedModelId]}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          error={error}
          model={MODELS.find(m => m.id === selectedModelId)!}
        />
      </main>
    </div>
  );
}