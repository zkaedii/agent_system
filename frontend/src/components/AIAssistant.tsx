import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaTrash } from 'react-icons/fa';
import { useStore } from '../store/useStore';
import type { AIMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const { aiMessages, addAIMessage, clearAIMessages, addXP } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    addAIMessage(userMessage);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (in production, this would call your AI backend)
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      addAIMessage(aiResponse);
      setIsLoading(false);
      addXP(50); // Reward for using AI assistance
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi')) {
      return "👋 Hello! I'm here to help you code. What would you like to work on?";
    }

    if (lower.includes('function') || lower.includes('create')) {
      return "I can help you create a function! Here's a template:\n\n```typescript\nfunction myFunction(param: string): void {\n  // Your code here\n  console.log(param);\n}\n```\n\nWould you like me to customize this for your specific use case?";
    }

    if (lower.includes('bug') || lower.includes('error') || lower.includes('fix')) {
      return "🐛 Let me help debug that! To assist you better, please:\n\n1. Share the error message\n2. Show me the relevant code\n3. Describe what you expected vs. what happened\n\nI'll analyze it and suggest fixes!";
    }

    if (lower.includes('optimize') || lower.includes('improve')) {
      return "⚡ I can help optimize your code! Here are some general tips:\n\n• Use efficient data structures\n• Avoid unnecessary loops\n• Cache computed values\n• Use async/await for I/O operations\n\nShare your code and I'll provide specific suggestions!";
    }

    if (lower.includes('explain') || lower.includes('what is')) {
      return "📚 I'd be happy to explain that concept! Could you be more specific about what you'd like to understand? I can explain:\n\n• Programming concepts\n• Code patterns\n• Best practices\n• Framework features";
    }

    return `I understand you're asking about: "${userInput}"\n\nI'm here to assist with:\n• Writing and debugging code\n• Explaining concepts\n• Code optimization\n• Best practices\n• Framework guidance\n\nHow can I help you with this specifically?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-dark-panel border-l border-dark-border">
      {/* Header */}
      <div className="p-3 border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaRobot className="text-primary-400" />
          <h2 className="text-sm font-semibold text-gray-200">AI Assistant</h2>
        </div>
        <button
          onClick={clearAIMessages}
          className="text-gray-400 hover:text-red-400 transition-colors"
          title="Clear conversation"
        >
          <FaTrash size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-white" size={16} />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-bg text-gray-200'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <FaUser className="text-white" size={16} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <FaRobot className="text-white" size={16} />
            </div>
            <div className="bg-dark-bg rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about coding..."
            className="flex-1 bg-dark-bg text-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-4 transition-colors"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
