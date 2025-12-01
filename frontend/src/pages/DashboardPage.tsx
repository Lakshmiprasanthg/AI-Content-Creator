import React from 'react';
import PromptForm from '../components/PromptForm';
import GeneratedContent from '../components/GeneratedContent';
import { useGenerateContent } from '../hooks/useGenerateContent';

const DashboardPage: React.FC = () => {
  const {
    prompt,
    setPrompt,
    category,
    setCategory,
    generatedText,
    loading,
    saving,
    error,
    saveSuccess,
    handleGenerate,
    handleSave
  } = useGenerateContent();

  return (
    <div className="max-w-5xl mx-auto px-6 pb-20">
      <div className="mb-10 text-center glass-card-dark rounded-3xl p-8 border-2 border-emerald-400/30">
        <h1 className="text-6xl font-extrabold text-emerald-400 mb-4" style={{textShadow: '0 4px 20px rgba(16, 185, 129, 0.6)'}}>AI Content Generator</h1>
        <p className="text-white/90 text-xl font-medium" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>Transform your ideas into engaging content with AI</p>
      </div>
      <PromptForm
        prompt={prompt}
        setPrompt={setPrompt}
        category={category}
        setCategory={setCategory}
        loading={loading}
        onGenerate={handleGenerate}
      />
      {error && <div className="mt-4 p-5 glass-card-dark rounded-2xl text-sm text-white font-semibold border-2 border-red-400/50" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>{error}</div>}
      <GeneratedContent
        generatedText={generatedText}
        saving={saving}
        saveSuccess={saveSuccess}
        onSave={handleSave}
        disabled={!generatedText}
      />
    </div>
  );
};

export default DashboardPage;
