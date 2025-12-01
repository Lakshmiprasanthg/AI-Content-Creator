import React, { useEffect, useState } from 'react';
import { fetchHistory, ContentItem } from '../api/contentApi';
import HistorySkeleton from '../components/HistorySkeleton';

const HistoryPage: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        setLoading(true);
        const { items } = await fetchHistory();
        setItems(items);
      } catch (e: any) {
        setError(e?.response?.data?.message || e.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-3" style={{textShadow: '0 4px 20px rgba(0,0,0,0.3)'}}>Content History</h1>
          <p className="text-white/90 text-lg font-medium" style={{textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>View and manage your AI-generated content</p>
        </div>
        <HistorySkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-10 text-center glass-card-dark rounded-3xl p-8 border-2 border-emerald-400/30">
        <h1 className="text-6xl font-extrabold text-emerald-400 mb-4" style={{textShadow: '0 4px 20px rgba(16, 185, 129, 0.6)'}}>Content History</h1>
        <p className="text-white/90 text-xl font-medium" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>View and manage your AI-generated content</p>
      </div>
      {error && <div className="text-sm text-white font-semibold glass-card-dark rounded-2xl p-5 mb-6 border-2 border-red-400/50" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>{error}</div>}
      {!error && items.length === 0 && <div className="text-center py-16 glass-card rounded-3xl"><p className="text-white/80 text-lg font-medium" style={{textShadow: '0 1px 3px rgba(0,0,0,0.2)'}}>No saved content yet. Start generating!</p></div>}
      <div className="space-y-6 mt-8">
        {items.map(item => {
          const categoryColorMap: { [key: string]: string } = {
            'Tweet': 'bg-blue-500/80 border-blue-400 shadow-blue-500/50',
            'Email': 'bg-green-500/80 border-green-400 shadow-green-500/50',
            'Blog': 'bg-purple-500/80 border-purple-400 shadow-purple-500/50',
            'Headline': 'bg-orange-500/80 border-orange-400 shadow-orange-500/50',
            'Code': 'bg-cyan-500/80 border-cyan-400 shadow-cyan-500/50',
            'Other': 'bg-gray-500/80 border-gray-400 shadow-gray-500/50'
          };
          const categoryColor = categoryColorMap[item.category] || categoryColorMap['Other'];
          
          return (
          <div key={item._id} className="glass-card rounded-3xl p-8 hover:scale-[1.01] transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <span className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full border-2 ${categoryColor} shadow-lg`} style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}>{item.category}</span>
              <span className="text-sm text-white/70 font-medium" style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold text-white mb-3" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Prompt:</p>
              <p className="text-sm text-white/90 whitespace-pre-wrap glass-input p-4 rounded-xl font-medium" style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>{item.promptUsed}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-3" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Generated Content:</p>
              <div className="text-sm text-white/90 whitespace-pre-wrap glass-input p-5 rounded-xl max-h-96 overflow-y-auto font-medium" style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>{item.generatedText}</div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
