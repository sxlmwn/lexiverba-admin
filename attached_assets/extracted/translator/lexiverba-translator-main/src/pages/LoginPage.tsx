import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('elena.marin@lexiverba.ai');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="w-full max-w-md bg-[#18181b] border-2 border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-blue-400 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-400/30">
            <span className="material-symbols-outlined text-[32px]">translate</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">LexiVerba Portal</h2>
          <p className="text-xs text-slate-400 font-medium">Translator &amp; Sworn Linguist Sign In</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#121215] rounded-2xl border border-zinc-800 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-400/40 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#121215] rounded-2xl border border-zinc-800 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-400/40 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-lg shadow-blue-400/20 transition-all cursor-pointer"
          >
            Sign In to Translator Portal
          </button>
        </form>
      </div>
    </div>
  );
};
