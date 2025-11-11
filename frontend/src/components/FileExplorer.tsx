import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import type { FileNode } from '../types';
import { useStore } from '../store/useStore';

interface FileNodeProps {
  node: FileNode;
  depth: number;
}

const FileNodeComponent: React.FC<FileNodeProps> = ({ node, depth }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { openTab, selectedFileId, setSelectedFile } = useStore();

  const handleClick = () => {
    if (node.type === 'file') {
      openTab(node);
      setSelectedFile(node.id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const isSelected = selectedFileId === node.id;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      ts: '📘',
      tsx: '⚛️',
      js: '📜',
      jsx: '⚛️',
      json: '📋',
      md: '📝',
      css: '🎨',
      html: '🌐',
      py: '🐍',
      java: '☕',
      go: '🐹',
      rs: '🦀',
    };
    return iconMap[ext || ''] || '📄';
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dark-hover transition-colors ${
          isSelected ? 'bg-primary-600/20' : ''
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          <span className="text-gray-400 text-xs">
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
        <span className="text-base">
          {node.type === 'folder' ? (
            isExpanded ? (
              <FaFolderOpen className="text-yellow-500" />
            ) : (
              <FaFolder className="text-yellow-500" />
            )
          ) : (
            <span>{getFileIcon(node.name)}</span>
          )}
        </span>
        <span className="text-sm text-gray-200">{node.name}</span>
      </div>
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileNodeComponent key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  const { files } = useStore();

  return (
    <div className="h-full bg-dark-panel border-r border-dark-border overflow-y-auto">
      <div className="p-3 border-b border-dark-border">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Explorer
        </h2>
      </div>
      <div className="py-2">
        {files.map((node) => (
          <FileNodeComponent key={node.id} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};
