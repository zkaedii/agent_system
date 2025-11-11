import { useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/CodeEditor';
import { AIAssistant } from './components/AIAssistant';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { useStore } from './store/useStore';

function App() {
  const { sidebarOpen, aiPanelOpen, terminalOpen, settings } = useStore();

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  return (
    <div className="w-full h-screen flex flex-col bg-dark-bg text-gray-200">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        {sidebarOpen && (
          <div className="w-64 flex-shrink-0">
            <FileExplorer />
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className={`${terminalOpen ? 'h-2/3' : 'h-full'} overflow-hidden`}>
            <CodeEditor />
          </div>

          {/* Terminal */}
          {terminalOpen && (
            <div className="h-1/3 overflow-hidden">
              <Terminal />
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        {aiPanelOpen && (
          <div className="w-96 flex-shrink-0">
            <AIAssistant />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}

export default App;
