import { useState, useCallback } from 'react';
import { mrApi, MR } from '../api/mr';
import { MRFilterParams } from '../types/mr.types';

export const useMRs = () => {
  const [mrs, setMrs] = useState<MR[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMRs = useCallback(async (params: MRFilterParams) => {
    setLoading(true);
    try {
      const response = await mrApi.getAll(params);
      setMrs(response.data.mrs);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch MRs:', error);
      setMrs([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mrs,
    loading,
    total,
    totalPages,
    fetchMRs,
  };
};