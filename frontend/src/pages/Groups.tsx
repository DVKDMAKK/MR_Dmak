import React from 'react';
import GroupList from '../components/groups/GroupList';
import StandardHeader from '../components/StandardHeader';
import { useGroups } from '../hooks/useGroups';
import GroupStats from '../components/groups/GroupStats';

const Groups: React.FC = () => {
  const { groups, loading, total, totalPages, fetchGroups } = useGroups();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <StandardHeader pageTitle="Group Management" />
        <GroupStats groups={groups} loading={loading} />
        <GroupList
          groups={groups}
          loading={loading}
          total={total}
          totalPages={totalPages}
          fetchGroups={fetchGroups}
        />
      </div>
    </div>
  );
};

export default Groups;