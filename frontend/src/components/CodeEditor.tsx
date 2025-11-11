import { useRef, useEffect } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { useStore } from '../store/useStore';
import { FaTimes } from 'react-icons/fa';

export const CodeEditor: React.FC = () => {
  const { tabs, activeTabId, closeTab, updateTabContent, setActiveTab, settings, addXP, incrementLinesOfCode } = useStore();
  const editorRef = useRef<any>(null);
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure Monaco editor
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editorCursor.foreground': '#0ea5e9',
      },
    });

    monaco.editor.setTheme('customDark');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeTabId && value !== undefined) {
      const oldContent = activeTab?.content || '';
      const newContent = value;

      // Calculate lines changed
      const oldLines = oldContent.split('\n').length;
      const newLines = newContent.split('\n').length;
      const linesChanged = Math.abs(newLines - oldLines);

      if (linesChanged > 0) {
        incrementLinesOfCode(linesChanged);
        addXP(linesChanged * 10); // 10 XP per line
      }

      updateTabContent(activeTabId, value);
    }
  };

  useEffect(() => {
    if (editorRef.current && activeTab) {
      const model = editorRef.current.getModel();
      if (model && model.getValue() !== activeTab.content) {
        editorRef.current.setValue(activeTab.content);
      }
    }
  }, [activeTab]);

  if (tabs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍💻</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">
            Welcome to Universal Auto Scripter IDE
          </h2>
          <p className="text-gray-500">
            Open a file from the explorer or create a new one to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Tabs */}
      <div className="flex items-center gap-0 bg-dark-panel border-b border-dark-border overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-dark-border hover:bg-dark-hover transition-colors ${
              tab.id === activeTabId ? 'bg-dark-bg text-primary-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm whitespace-nowrap">
              {tab.isDirty && '• '}
              {tab.title}
            </span>
            <button
              className="hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {activeTab && (
          <Editor
            height="100%"
            language={activeTab.language}
            value={activeTab.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="customDark"
            options={{
              fontSize: settings.fontSize,
              tabSize: settings.tabSize,
              minimap: { enabled: settings.minimap },
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              fontFamily: settings.theme === 'dark' ? 'Fira Code, Monaco, monospace' : 'monospace',
              fontLigatures: true,
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              padding: { top: 16 },
            }}
          />
        )}
      </div>
    </div>
  );
};
