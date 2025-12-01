import { useState } from 'react';
import { generateContent, saveContent } from '../api/contentApi';
import toast from 'react-hot-toast';

export const useGenerateContent = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('Other');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setSaveSuccess(false);
    if (!prompt.trim()) {
      setError('Prompt is required');
      toast.error('Prompt is required');
      return;
    }
    const toastId = toast.loading('Generating content...');
    try {
      setLoading(true);
      const { generatedText } = await generateContent(prompt);
      setGeneratedText(generatedText);
      toast.success('Content generated!', { id: toastId });
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message || 'Failed to generate';
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSaveSuccess(false);
    if (!generatedText) {
      const msg = 'Nothing to save yet. Generate content first.';
      setError(msg);
      toast.error(msg);
      return;
    }
    const toastId = toast.loading('Saving content...');
    try {
      setSaving(true);
      await saveContent(prompt, generatedText, category);
      setSaveSuccess(true);
      toast.success('Saved to history!', { id: toastId });
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message || 'Failed to save';
      setError(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};
