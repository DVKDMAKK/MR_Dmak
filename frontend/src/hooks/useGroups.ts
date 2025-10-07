import { useState, useCallback } from 'react';
import { groupsApi, Group } from '../api/groups';
import { GroupFilterParams } from '../types/group.types';

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchGroups = useCallback(async (params: GroupFilterParams) => {
    setLoading(true);
    try {
      const response = await groupsApi.getAll(params);
      setGroups(response.data.groups);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      setGroups([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    groups,
    loading,
    total,
    totalPages,
    fetchGroups,
  };
};