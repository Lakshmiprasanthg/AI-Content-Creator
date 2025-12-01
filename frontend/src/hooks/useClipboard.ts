import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Clipboard utility hook.
 * Returns copied state and copy function.
 */
const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text: string, successMessage: string = 'Copied to clipboard!') => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard not available');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast.success(successMessage);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Clipboard error:', err);
        toast.error('Copy failed');
      });
  };

  return { copied, copy };
};

export default useClipboard;
