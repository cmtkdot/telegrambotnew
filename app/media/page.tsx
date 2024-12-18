'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MediaItem } from '@/types/media';
import { Search } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { MediaPreviewModal } from '@/components/media/media-preview-modal';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaSortButtons } from './components/media-sort-buttons';
import { ChannelSelect } from './components/channel-select';
import { TagSelect } from './components/tag-select';
import { useMediaSort } from './hooks/use-media-sort';
import { useMediaFilter } from './hooks/use-media-filter';
import { useChannels } from '@/hooks/use-channels';
import { useState } from 'react';

// Temporary mock data
const mockItems: MediaItem[] = [
  {
    id: '1',
    fileName: 'vacation-video.mp4',
    fileUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    mediaType: 'video',
    createdAt: new Date().toISOString(),
    tags: ['vacation', 'summer'],
  },
  {
    id: '2',
    fileName: 'project-document.pdf',
    fileUrl: 'https://example.com/doc.pdf',
    mediaType: 'document',
    createdAt: new Date().toISOString(),
    tags: ['work'],
  },
  {
    id: '3',
    fileName: 'sunset.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    mediaType: 'image',
    createdAt: new Date().toISOString(),
    tags: ['nature'],
  },
];

export default function MediaPage() {
  const [items] = useState<MediaItem[]>(mockItems);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  const { sortedItems, sortBy, sortOrder, toggleSort } = useMediaSort(items);
  const {
    filteredItems,
    selectedType,
    setSelectedType,
    selectedChannel,
    setSelectedChannel,
    selectedTags,
    setSelectedTags,
    searchQuery,
    setSearchQuery
  } = useMediaFilter(sortedItems);

  const { data: channels } = useChannels();

  return (
    <>
      <SiteHeader className="glass" />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar for filters */}
          <div className="w-full md:w-64 md:flex-shrink-0">
            <div className="glass rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Channels</h3>
                <ChannelSelect
                  channels={channels || []}
                  value={selectedChannel}
                  onChange={setSelectedChannel}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Tags</h3>
                <TagSelect
                  value={selectedTags}
                  onChange={setSelectedTags}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Type</h3>
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger className="w-full glass border-white/10">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/10">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-white glow">Media Library</h1>
              <p className="text-white/60">
                Browse and manage your media files
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row items-center glass rounded-lg p-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  className="pl-8 glass border-white/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <MediaSortButtons
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={toggleSort}
              />
            </div>

            <MediaGrid
              items={filteredItems}
              onSelectItem={setSelectedItem}
            />

            <MediaPreviewModal
              item={selectedItem}
              isOpen={!!selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        </div>
      </main>
    </>
  );
}