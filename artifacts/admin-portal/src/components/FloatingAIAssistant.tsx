import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { useTheme } from '../theme';

export const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className={cn(
            'absolute bottom-16 right-0 w-80 rounded-[2rem] border-2 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right mb-4',
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
            isDarkMode
              ? 'bg-[#18181b] border-[#27272a] text-white'
              : 'bg-white border-slate-200 text-slate-900'
          )}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-blue-400 flex items-center justify-between bg-blue-500 text-white dark:border-[#27272a]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="font-semibold text-sm">LexiVerba AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-200 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-5 overflow-y-auto min-h-[200px] max-h-[300px] space-y-4">
            <div className="flex items-start gap-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <div className={cn(
                "p-3 rounded-2xl rounded-tl-sm",
                isDarkMode ? "bg-[#27272a]" : "bg-slate-100"
              )}>
                I'm here to help with admin tasks. What would you like to do?
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className={cn(
            "p-3 border-t",
            isDarkMode ? "border-[#27272a] bg-[#121215]" : "border-slate-200 bg-slate-50"
          )}>
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask LexiVerba AI..."
                className={cn(
                  "w-full text-xs py-2.5 pl-4 pr-10 rounded-xl outline-none transition-colors border",
                  isDarkMode 
                    ? "bg-[#18181b] border-[#27272a] focus:border-blue-500 text-white placeholder-slate-500" 
                    : "bg-white border-slate-300 focus:border-blue-500 text-slate-900"
                )}
              />
              <button 
                className={cn(
                  "absolute right-2 p-1 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer",
                  !inputValue && "opacity-50 pointer-events-none"
                )}
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer float-hover"
      >
        <span className="material-symbols-outlined text-[28px]">
          {isOpen ? 'close' : 'auto_awesome'}
        </span>
      </button>
    </div>
  );
};
