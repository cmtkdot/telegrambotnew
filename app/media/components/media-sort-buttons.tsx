'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDownAZ, ArrowUpAZ, Calendar } from 'lucide-react';

interface MediaSortButtonsProps {
  sortBy: 'name' | 'date';
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: 'name' | 'date') => void;
}

export function MediaSortButtons({ sortBy, sortOrder, onSort }: MediaSortButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'glass border-white/10',
          sortBy === 'name' && 'bg-purple-500/20 text-purple-400'
        )}
        onClick={() => onSort('name')}
      >
        {sortBy === 'name' && sortOrder === 'asc' ? (
          <ArrowDownAZ className="h-4 w-4" />
        ) : (
          <ArrowUpAZ className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'glass border-white/10',
          sortBy === 'date' && 'bg-purple-500/20 text-purple-400'
        )}
        onClick={() => onSort('date')}
      >
        <Calendar className="h-4 w-4" />
      </Button>
    </div>
  );
}