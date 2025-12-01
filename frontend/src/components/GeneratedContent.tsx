import React from 'react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import useClipboard from '../hooks/useClipboard';

interface Props {
  generatedText: string;
  saving: boolean;
  saveSuccess: boolean;
  onSave: () => void;
  disabled?: boolean;
}

const GeneratedContent: React.FC<Props> = ({ generatedText, saving, saveSuccess, onSave, disabled }) => {
  const { copy, copied } = useClipboard();
  if (!generatedText) return null;

  const handleSave = async () => {
    if (disabled || saving) return;
    const id = toast.loading('Saving...');
    try {
      await onSave();
      toast.success('Saved to history!', { id });
    } catch (e: any) {
      toast.error(e?.message || 'Save failed', { id });
    }
  };

  const handleCopy = () => {
    copy(generatedText, 'Content copied!');
  };

  return (
    <div className="mt-8 glass-card rounded-3xl p-8 animate-in fade-in duration-500">
      <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-2xl font-bold text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>Generated Content</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={copied}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
              copied 
                ? 'bg-cyan-500/80 border-cyan-400 scale-95 shadow-lg shadow-cyan-500/50' 
                : 'glass-button text-white border-white/30 hover:scale-105 hover:border-cyan-400/50'
            }`}
            style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || disabled}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 border-2 ${
              saving || disabled 
                ? 'bg-emerald-500/50 border-emerald-400/50 cursor-not-allowed opacity-70' 
                : saveSuccess 
                ? 'bg-emerald-500/80 border-emerald-400 scale-95 shadow-lg shadow-emerald-500/50'
                : 'bg-emerald-500/80 border-emerald-400 hover:bg-emerald-500 hover:scale-105 shadow-lg shadow-emerald-500/50'
            }`}
            style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : saveSuccess ? '✓ Saved!' : 'Save to History'}
          </button>
        </div>
      </div>
      <div className="markdown-body glass-input rounded-2xl p-6">
        <ReactMarkdown>{generatedText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GeneratedContent;
