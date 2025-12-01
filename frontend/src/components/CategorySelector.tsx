import React from 'react';

interface Props {
  category: string;
  setCategory: (val: string) => void;
}

const categories = ['Tweet', 'Email', 'Blog', 'Headline', 'Code', 'Other'];

const categoryColors: { [key: string]: string } = {
  'Tweet': 'bg-blue-500/80 border-blue-400',
  'Email': 'bg-green-500/80 border-green-400',
  'Blog': 'bg-purple-500/80 border-purple-400',
  'Headline': 'bg-orange-500/80 border-orange-400',
  'Code': 'bg-cyan-500/80 border-cyan-400',
  'Other': 'bg-gray-500/80 border-gray-400'
};

const CategorySelector: React.FC<Props> = ({ category, setCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {categories.map(c => (
        <button
          key={c}
          type="button"
          onClick={() => setCategory(c)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
            category === c 
              ? `${categoryColors[c]} scale-110 shadow-xl text-white` 
              : 'glass-button text-white border-white/30 hover:scale-105'
          }`}
          style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
