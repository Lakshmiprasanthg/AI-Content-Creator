import React from 'react';
import CategorySelector from './CategorySelector';

interface Props {
  prompt: string;
  setPrompt: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  loading: boolean;
  onGenerate: () => void;
}

const PromptForm: React.FC<Props> = ({ prompt, setPrompt, category, setCategory, loading, onGenerate }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onGenerate(); }}
      className="space-y-6 glass-card rounded-3xl p-8"
    >
      <div className="relative">
        {!isFocused && !prompt && (
          <label 
            className="absolute left-4 top-4 text-white/70 text-base font-medium pointer-events-none transition-opacity duration-200"
            style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}
          >
            Describe your content idea
          </label>
        )}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={6}
          className="w-full rounded-2xl glass-input focus-glow text-base p-4 transition-all duration-200 resize-none text-white placeholder-white/50 font-medium"
          placeholder={isFocused || prompt ? "e.g., Write a professional email about productivity tips..." : ""}
          style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}
        />
      </div>
      <div>
        <span className="text-sm font-bold text-white mb-3 block" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Content Category</span>
        <CategorySelector category={category} setCategory={setCategory} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-8 py-4 rounded-2xl text-white text-lg font-bold transition-all duration-300 border-2 ${
          loading 
            ? 'bg-emerald-500/50 border-emerald-400/50 cursor-not-allowed opacity-70' 
            : 'bg-emerald-500/80 border-emerald-400 hover:bg-emerald-500 hover:scale-[1.02] shadow-lg shadow-emerald-500/50'
        }`}
        style={loading ? { animation: 'pulse-glow 2s infinite', textShadow: '0 1px 3px rgba(0,0,0,0.3)' } : {textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating with AI...
          </span>
        ) : '✨ Generate Content'}
      </button>
    </form>
  );
};

export default PromptForm;
