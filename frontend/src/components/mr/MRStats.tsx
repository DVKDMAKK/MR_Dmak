import React from 'react';

interface MRStatsProps {
  total: number;
  loading: boolean;
}

const MRStats: React.FC<MRStatsProps> = ({ total, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-500">Total MRs</h3>
        <p className="text-3xl font-bold text-gray-800">{total}</p>
      </div>
    </div>
  );
};

export default MRStats;