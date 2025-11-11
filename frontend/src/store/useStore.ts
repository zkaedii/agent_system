import { create } from 'zustand';
import type { EditorTab, FileNode, UserStats, AIMessage, AppSettings, Theme } from '../types';

interface AppState {
  // Editor state
  tabs: EditorTab[];
  activeTabId: string | null;
  openTab: (file: FileNode) => void;
  closeTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
  setActiveTab: (tabId: string) => void;

  // File explorer state
  files: FileNode[];
  selectedFileId: string | null;
  setFiles: (files: FileNode[]) => void;
  setSelectedFile: (fileId: string) => void;

  // User stats and rewards
  userStats: UserStats;
  addXP: (amount: number) => void;
  incrementLinesOfCode: (lines: number) => void;

  // AI Assistant
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;
  clearAIMessages: () => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setTheme: (theme: Theme) => void;

  // UI State
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  terminalOpen: boolean;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  toggleTerminal: () => void;
}

const defaultFiles: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        id: '2',
        name: 'main.ts',
        type: 'file',
        path: '/src/main.ts',
        language: 'typescript',
        content: `// Welcome to Universal Auto Scripter IDE!
// This is a powerful, AI-assisted development environment

console.log('Hello from Auto Scripter IDE!');

function greet(name: string): string {
  return \`Hello, \${name}! Ready to build something amazing?\`;
}

greet('Developer');
`,
      },
      {
        id: '3',
        name: 'app.tsx',
        type: 'file',
        path: '/src/app.tsx',
        language: 'typescript',
        content: `import React from 'react';

export default function App() {
  return (
    <div className="app">
      <h1>Welcome to Auto Scripter IDE</h1>
      <p>Start building with AI assistance!</p>
    </div>
  );
}
`,
      },
    ],
  },
  {
    id: '4',
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    language: 'markdown',
    content: `# Universal Auto Scripter IDE

An AI-powered development environment with:

- 🚀 Multi-language support
- 🤖 Intelligent code generation
- 👥 Real-time collaboration
- 🎮 Gamification & rewards
- 🎨 Beautiful, modern UI

Get started by exploring the file tree or asking the AI assistant for help!
`,
  },
];

const defaultAchievements = [
  {
    id: 'first-line',
    title: 'First Steps',
    description: 'Write your first line of code',
    icon: '✏️',
    unlocked: false,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Write 100 lines in one session',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'ai-enthusiast',
    title: 'AI Enthusiast',
    description: 'Use AI assistance 10 times',
    icon: '🤖',
    unlocked: false,
  },
  {
    id: 'collaboration-king',
    title: 'Collaboration King',
    description: 'Collaborate with a teammate',
    icon: '👥',
    unlocked: false,
  },
];

export const useStore = create<AppState>((set) => ({
  // Initial editor state
  tabs: [],
  activeTabId: null,

  openTab: (file) => {
    set((state) => {
      const existingTab = state.tabs.find((tab) => tab.path === file.path);
      if (existingTab) {
        return { activeTabId: existingTab.id };
      }
      const newTab: EditorTab = {
        id: file.id,
        title: file.name,
        content: file.content || '',
        language: file.language || 'plaintext',
        path: file.path,
        isDirty: false,
      };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    });
  },

  closeTab: (tabId) => {
    set((state) => {
      const newTabs = state.tabs.filter((tab) => tab.id !== tabId);
      let newActiveTabId = state.activeTabId;
      if (state.activeTabId === tabId) {
        newActiveTabId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
      }
      return { tabs: newTabs, activeTabId: newActiveTabId };
    });
  },

  updateTabContent: (tabId, content) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, content, isDirty: true } : tab
      ),
    }));
  },

  setActiveTab: (tabId) => {
    set({ activeTabId: tabId });
  },

  // File explorer
  files: defaultFiles,
  selectedFileId: null,

  setFiles: (files) => set({ files }),
  setSelectedFile: (fileId) => set({ selectedFileId: fileId }),

  // User stats
  userStats: {
    xp: 0,
    level: 1,
    linesOfCode: 0,
    filesEdited: 0,
    achievements: defaultAchievements,
  },

  addXP: (amount) => {
    set((state) => {
      const newXP = state.userStats.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return {
        userStats: {
          ...state.userStats,
          xp: newXP,
          level: newLevel,
        },
      };
    });
  },

  incrementLinesOfCode: (lines) => {
    set((state) => ({
      userStats: {
        ...state.userStats,
        linesOfCode: state.userStats.linesOfCode + lines,
      },
    }));
  },

  // AI Assistant
  aiMessages: [
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your AI coding assistant. I can help you:\n\n• Write and debug code\n• Explain complex concepts\n• Suggest optimizations\n• Generate boilerplate code\n\nWhat would you like to work on today?",
      timestamp: new Date(),
    },
  ],

  addAIMessage: (message) => {
    set((state) => ({
      aiMessages: [...state.aiMessages, message],
    }));
  },

  clearAIMessages: () => {
    set({ aiMessages: [] });
  },

  // Settings
  settings: {
    theme: 'dark',
    fontSize: 14,
    tabSize: 2,
    autoSave: true,
    minimap: true,
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  setTheme: (theme) => {
    set((state) => ({
      settings: { ...state.settings, theme },
    }));
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  // UI State
  sidebarOpen: true,
  aiPanelOpen: true,
  terminalOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
}));
