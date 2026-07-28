import React from 'react';

interface AIAssistantPageProps {
  isDarkMode?: boolean;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ isDarkMode = false }) => {
  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          AI Delivery Assistant
        </h1>
        <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Complete deliveries with AI-powered verification
        </p>
      </div>

      {/* Current Delivery Card */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Current Delivery</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-slate-400 font-medium">Title:</span>
            <span className="ml-2 font-semibold">Birth Certificate Translation — Document Package</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Recipient:</span>
            <span className="ml-2 font-semibold">John Smith</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Address:</span>
            <span className="ml-2 font-semibold">123 Main Street, New York, NY 10001</span>
          </div>
          <div className={`p-3 rounded-xl border mt-3 ${
            isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'
          }`}>
            <span className="text-blue-500 font-medium text-xs">Info: </span>
            <span className="font-semibold text-xs">Leave with doorman if not available</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Photo Proof */}
        <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Photo Proof</h3>
          <div className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
            isDarkMode ? 'border-zinc-700 hover:border-blue-500/50 hover:bg-zinc-900/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'
            }`}>
              <span className="material-symbols-outlined text-[32px] text-blue-500">cloud_upload</span>
            </div>
            <p className="font-semibold text-sm mb-1">Take Photo or Upload</p>
            <p className="text-xs text-slate-400 font-medium">AI will verify the delivery package</p>
          </div>
        </div>

        {/* QR Code Verification */}
        <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
          isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
        }`}>
          <h3 className="text-lg font-semibold mb-4">QR Code Verification</h3>
          <div className="text-center">
            <div className={`w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'
            }`}>
              <span className="material-symbols-outlined text-[48px] text-blue-500">qr_code_2</span>
            </div>
            <p className="font-semibold text-sm mb-1">Scan Package QR Code</p>
            <p className="text-xs text-slate-400 font-medium mb-6">Verify package authenticity</p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
              Start Scan
            </button>
          </div>
        </div>
      </div>

      {/* Recipient Signature */}
      <div className={`p-8 rounded-[2.5rem] border-2 float-shadow smooth-card transition-colors ${
        isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-white border-slate-200/80'
      }`}>
        <h3 className="text-lg font-semibold mb-4">Recipient Signature</h3>
        <div className={`border-2 border-dashed rounded-2xl p-16 ${
          isDarkMode ? 'border-zinc-700 bg-zinc-900/50' : 'border-slate-300 bg-slate-50'
        }`}>
          <p className="text-center text-xs text-slate-400 font-medium">Sign here to confirm delivery</p>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
        Submit Delivery
      </button>
    </div>
  );
};
