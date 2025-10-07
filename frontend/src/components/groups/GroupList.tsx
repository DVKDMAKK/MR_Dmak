import React, { useState, useEffect } from 'react';
import { Group } from '../../api/groups';
import { GroupFilterParams } from '../../types/group.types';

interface GroupListProps {
  groups: Group[];
  loading: boolean;
  total: number;
  totalPages: number;
  fetchGroups: (params: GroupFilterParams) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, loading, total, totalPages, fetchGroups }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const params: GroupFilterParams = {
      page: currentPage,
      limit: 10,
      search: searchTerm,
      sortField,
      sortDirection,
    };
    fetchGroups(params);
  }, [currentPage, searchTerm, sortField, sortDirection, fetchGroups]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">All Groups</h2>
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('name')}>
                Name
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('memberCount')}>
                Members
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('createdAt')}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="py-2 px-4 border-b">{group.name}</td>
                <td className="py-2 px-4 border-b">{group.memberCount}</td>
                <td className="py-2 px-4 border-b">{new Date(group.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex justify-between items-center">
        <p>Total: {total}</p>
        <div className="flex items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;