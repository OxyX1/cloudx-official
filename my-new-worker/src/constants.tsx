
import React from 'react';
import type { AIModel } from './types';
import { ModelId } from './types';
import { GeminiIcon, OpenAIIcon, CopilotIcon, ClaudeIcon } from './components/icons';

export const MODELS: AIModel[] = [
  {
    id: ModelId.GeminiFlash,
    name: 'Gemini Flash',
    provider: 'Google',
    icon: <GeminiIcon />,
    enabled: true,
    modelName: 'gemini-2.5-flash',
  },
  {
    id: ModelId.ChatGPT4,
    name: 'ChatGPT-4',
    provider: 'OpenAI',
    icon: <OpenAIIcon />,
    enabled: false,
    modelName: 'gpt-4',
  },
  {
    id: ModelId.Copilot,
    name: 'Copilot',
    provider: 'Microsoft',
    icon: <CopilotIcon />,
    enabled: false,
    modelName: 'copilot',
  },
  {
    id: ModelId.Claude,
    name: 'Claude 3',
    provider: 'Anthropic',
    icon: <ClaudeIcon />,
    enabled: false,
    modelName: 'claude-3-opus',
  },
];
