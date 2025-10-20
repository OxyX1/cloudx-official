import React from 'react';
import type { AIModel, ModelId } from '../types';

interface SidebarProps {
  models: AIModel[];
  selectedModelId: ModelId;
  onSelectModel: (modelId: ModelId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ models, selectedModelId, onSelectModel }) => {
  return (
    <aside className="w-64 bg-gray-950 p-4 flex flex-col border-r border-gray-700/50">
      <h1 className="text-xl font-bold mb-6 text-gray-200">AI Playground</h1>
      <nav className="flex flex-col gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => model.enabled && onSelectModel(model.id)}
            disabled={!model.enabled}
            className={`
              flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200
              ${!model.enabled 
                ? 'cursor-not-allowed text-gray-600' 
                : model.id === selectedModelId 
                  ? 'bg-blue-600/20 text-blue-300' 
                  : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
              }
            `}
          >
            <div className="flex-shrink-0 w-6 h-6">{model.icon}</div>
            <div className="flex-grow">
              <p className="font-semibold">{model.name}</p>
              <p className="text-xs text-gray-500">{model.provider}</p>
            </div>
            {!model.enabled && (
              <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                Soon
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-4 p-3 rounded-lg bg-yellow-900/40 border border-yellow-700/50 text-yellow-300 text-xs space-y-1">
        <p className="font-bold">Unfiltered Mode Active</p>
        <p className="text-yellow-400/80">
          Content filters are minimized for a less restrictive experience. Please use responsibly.
        </p>
      </div>
      <div className="mt-auto text-center text-xs text-gray-600">
        <p>Direct access to AI.</p>
        <p>Your conversation begins now.</p>
      </div>
    </aside>
  );
};