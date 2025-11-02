
export enum Sender {
  User = 'user',
  AI = 'ai',
}

export interface Message {
  sender: Sender;
  text: string;
  modelId?: ModelId;
}

export enum ModelId {
  GeminiFlash = 'gemini-flash',
  ChatGPT4 = 'chatgpt-4',
  Copilot = 'copilot',
  Claude = 'claude-3',
}

export interface AIModel {
  id: ModelId;
  name: string;
  provider: string;
  icon: React.ReactElement;
  enabled: boolean;
  modelName: string;
}
