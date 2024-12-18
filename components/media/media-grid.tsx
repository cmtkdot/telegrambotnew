'use client';

import { MediaItem } from '@/types/media';
import { MediaCard } from './media-card';

interface MediaGridProps {
  items: MediaItem[];
  onSelectItem?: (item: MediaItem) => void;
}

export function MediaGrid({ items, onSelectItem }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onSelect={onSelectItem} />
      ))}
    </div>
  );
}