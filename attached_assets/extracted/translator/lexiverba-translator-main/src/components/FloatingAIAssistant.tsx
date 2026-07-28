import React, { useState } from 'react';

export const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Greetings, Elena! I am Lexi Translator Copilot. Need assistance with terminology lookups, NMT post-editing suggestions, or quality checks?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userText = query;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzed segment: "${userText}". Terminology check passed with 99.1% match against your ISO-17100 sworn legal glossary.`
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="mb-4 w-96 bg-white dark:bg-[#121215] rounded-3xl shadow-2xl border-2 border-blue-500/20 overflow-hidden flex flex-col h-[460px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Lexi Translator Copilot</h4>
                <span className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">NMT Engine v4.2 • Sworn Mode</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-[#18181b] text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-400 text-white font-medium rounded-br-none shadow-xs'
                      : 'bg-white dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 text-slate-800 dark:text-slate-100 shadow-sm rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#121215] border-t border-slate-200 dark:border-zinc-800 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask terminology, glossary or post-editing..."
              className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-400/40 text-slate-800 dark:text-white font-medium"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-400 text-white rounded-3xl shadow-[0_12px_40px_rgba(96,165,250,0.4)] flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all active:scale-95 group relative cursor-pointer"
      >
        <span className="material-symbols-outlined text-[32px]">psychology</span>
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap text-xs font-semibold border border-blue-400/30">
            Open Translator AI Copilot
          </div>
        )}
      </button>
    </div>
  );
};
