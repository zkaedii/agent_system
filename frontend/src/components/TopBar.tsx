import { useState } from 'react';
import {
  FaBars,
  FaRobot,
  FaTerminal,
  FaCog,
  FaMoon,
  FaSun,
  FaUsers,
  FaPlay,
} from 'react-icons/fa';
import { useStore } from '../store/useStore';

export const TopBar: React.FC = () => {
  const {
    toggleSidebar,
    toggleAIPanel,
    toggleTerminal,
    settings,
    setTheme,
    sidebarOpen,
    aiPanelOpen,
    terminalOpen,
  } = useStore();

  const [showSettings, setShowSettings] = useState(false);

  const toggleTheme = () => {
    setTheme(settings.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div className="h-12 bg-dark-panel border-b border-dark-border flex items-center justify-between px-4">
        {/* Left side - Logo & Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <h1 className="text-lg font-bold text-gray-200">
              Auto Scripter <span className="text-primary-400">IDE</span>
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleSidebar}
              className={`px-3 py-1.5 rounded hover:bg-dark-hover transition-colors ${
                sidebarOpen ? 'text-primary-400' : 'text-gray-400'
              }`}
              title="Toggle Sidebar"
            >
              <FaBars size={16} />
            </button>
            <button
              onClick={toggleAIPanel}
              className={`px-3 py-1.5 rounded hover:bg-dark-hover transition-colors ${
                aiPanelOpen ? 'text-primary-400' : 'text-gray-400'
              }`}
              title="Toggle AI Assistant"
            >
              <FaRobot size={16} />
            </button>
            <button
              onClick={toggleTerminal}
              className={`px-3 py-1.5 rounded hover:bg-dark-hover transition-colors ${
                terminalOpen ? 'text-primary-400' : 'text-gray-400'
              }`}
              title="Toggle Terminal"
            >
              <FaTerminal size={16} />
            </button>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white transition-colors"
            title="Run Code"
          >
            <FaPlay size={12} />
            <span className="text-sm">Run</span>
          </button>

          <div className="w-px h-6 bg-dark-border mx-2" />

          <button
            className="px-3 py-1.5 rounded hover:bg-dark-hover text-gray-400 transition-colors"
            title="Collaboration"
          >
            <FaUsers size={16} />
          </button>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded hover:bg-dark-hover text-gray-400 transition-colors"
            title="Toggle Theme"
          >
            {settings.theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-3 py-1.5 rounded hover:bg-dark-hover text-gray-400 transition-colors"
            title="Settings"
          >
            <FaCog size={16} />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-dark-panel border border-dark-border rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                <FaCog />
                Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Font Size
                </label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) =>
                    useStore.getState().updateSettings({ fontSize: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">{settings.fontSize}px</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tab Size</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="2"
                  value={settings.tabSize}
                  onChange={(e) =>
                    useStore.getState().updateSettings({ tabSize: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">{settings.tabSize} spaces</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Auto Save</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) =>
                      useStore.getState().updateSettings({ autoSave: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Minimap</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.minimap}
                    onChange={(e) =>
                      useStore.getState().updateSettings({ minimap: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
