'use client';

import { useState } from 'react';
import { MediaItem } from '@/types/media';

type SortOrder = 'asc' | 'desc';
type SortBy = 'name' | 'date';

export function useMediaSort(initialItems: MediaItem[]) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  const sortedItems = [...initialItems].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return sortOrder === 'asc'
        ? a.fileName.localeCompare(b.fileName)
        : b.fileName.localeCompare(a.fileName);
    }
  });

  const toggleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder(newSortBy === 'date' ? 'desc' : 'asc');
    }
  };

  return {
    sortedItems,
    sortOrder,
    sortBy,
    toggleSort,
  };
}