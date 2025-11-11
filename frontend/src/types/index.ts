export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
  path: string;
}

export interface EditorTab {
  id: string;
  title: string;
  content: string;
  language: string;
  path: string;
  isDirty: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface UserStats {
  xp: number;
  level: number;
  linesOfCode: number;
  filesEdited: number;
  achievements: Achievement[];
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type Theme = 'dark' | 'light' | 'monokai' | 'nord';

export interface AppSettings {
  theme: Theme;
  fontSize: number;
  tabSize: number;
  autoSave: boolean;
  minimap: boolean;
}
