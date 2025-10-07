import { useState, useEffect, useCallback } from 'react';
import { Contact, Group } from '../types/mr.types';
import { api } from '../lib/api';
import { useMRs } from './useMRs';

export interface MRPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  groupId?: string;
  consentStatus?: string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface BackendPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export const useMRData = (initialParams: MRPaginationParams) => {
  const { mrs, loading, total, totalPages, fetchMRs } = useMRs();
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    fetchMRs(params);
  }, [params, fetchMRs]);

  const setPaginationParams = (newParams: Partial<MRPaginationParams>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  return {
    contacts: mrs,
    loading,
    total,
    totalPages,
    paginationParams: params,
    setPaginationParams,
  };
};
