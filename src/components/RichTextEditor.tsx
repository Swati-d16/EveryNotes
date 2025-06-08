
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle some keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-2 py-2 border-b border-gray-700 mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white p-2 h-8 w-8"
          onClick={() => execCommand('bold')}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold text-sm">B</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white p-2 h-8 w-8"
          onClick={() => execCommand('italic')}
          title="Italic (Ctrl+I)"
        >
          <span className="italic text-sm">I</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white p-2 h-8 w-8"
          onClick={() => execCommand('underline')}
          title="Underline (Ctrl+U)"
        >
          <span className="underline text-sm">U</span>
        </Button>

        <div className="w-px h-4 bg-gray-600 mx-2" />

        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white p-2 h-8 w-8"
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white p-2 h-8 w-8"
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0a2 2 0 11-4 0 2 2 0 014 0zM1 12h22m-10 4v4m0 0l-4-4m4 4l4-4" />
          </svg>
        </Button>

        <div className="w-px h-4 bg-gray-600 mx-2" />

        <select 
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded px-2 py-1"
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          defaultValue=""
        >
          <option value="">Format</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable
          className={`w-full h-full bg-transparent text-white text-lg leading-relaxed outline-none resize-none overflow-y-auto ${
            !isFocused && !content ? 'text-gray-500' : ''
          }`}
          style={{ 
            minHeight: '400px',
            wordWrap: 'break-word',
          }}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
        
        {/* Placeholder */}
        {!content && !isFocused && (
          <div 
            className="absolute top-0 left-0 text-gray-500 text-lg pointer-events-none"
            style={{ lineHeight: '1.75rem' }}
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
