'use client';

import { useState } from 'react';
import { MediaItem } from '@/types/media';

export function useMediaFilter(items: MediaItem[]) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    const matchesType = selectedType === 'all' || item.mediaType === selectedType;
    const matchesChannel = !selectedChannel || item.channelId === selectedChannel;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags?.includes(tag));
    const matchesSearch = !searchQuery || 
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesChannel && matchesTags && matchesSearch;
  });

  return {
    filteredItems,
    selectedType,
    setSelectedType,
    selectedChannel,
    setSelectedChannel,
    selectedTags,
    setSelectedTags,
    searchQuery,
    setSearchQuery,
  };
}