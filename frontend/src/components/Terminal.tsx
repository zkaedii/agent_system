import { useState, useRef, useEffect } from 'react';
import { FaTerminal } from 'react-icons/fa';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'Universal Auto Scripter IDE Terminal v1.0.0',
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" for available commands',
    },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    // Add input line
    setLines((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'input',
        content: `$ ${command}`,
      },
    ]);

    // Process command
    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  about    - About this IDE
  whoami   - Display current user
  date     - Show current date and time
  echo     - Echo text back`;
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      case 'about':
        output = `Universal Auto Scripter IDE
Version: 1.0.0
An AI-powered development environment
Built with React, TypeScript, and Monaco Editor`;
        break;
      case 'whoami':
        output = 'developer@autoscripter-ide';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case '':
        return;
      default:
        if (cmd.startsWith('echo ')) {
          output = command.substring(5);
        } else {
          output = `Command not found: ${cmd}. Type "help" for available commands.`;
          isError = true;
        }
    }

    // Add output line
    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: isError ? 'error' : 'output',
          content: output,
        },
      ]);
    }, 100);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full bg-dark-bg border-t border-dark-border flex flex-col">
      {/* Terminal Header */}
      <div className="px-3 py-2 bg-dark-panel border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <FaTerminal size={14} />
          <span className="text-sm font-semibold">Terminal</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`mb-1 ${
              line.type === 'input'
                ? 'text-primary-400'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-gray-300'
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 text-primary-400">
          <span>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-gray-200"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
