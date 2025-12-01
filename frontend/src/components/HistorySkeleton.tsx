import React from 'react';

const HistorySkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-200 animate-pulse">
          <div className="flex justify-between items-center mb-3">
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/6" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded w-11/12" />
            <div className="h-3 bg-gray-100 rounded w-10/12" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySkeleton;
