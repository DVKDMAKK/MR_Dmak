import React from 'react';
import { Group } from '../../api/groups';

interface GroupStatsProps {
  groups: Group[];
  loading: boolean;
}

const GroupStats: React.FC<GroupStatsProps> = ({ groups, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    );
  }

  const totalGroups = groups.length;
  const totalMembers = groups.reduce((acc, group) => acc + (group.memberCount || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-500">Total Groups</h3>
        <p className="text-3xl font-bold text-gray-800">{totalGroups}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-500">Total Members</h3>
        <p className="text-3xl font-bold text-gray-800">{totalMembers}</p>
      </div>
    </div>
  );
};

export default GroupStats;