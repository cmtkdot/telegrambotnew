'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MediaItem } from '@/types/media';
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface MediaCardProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
}

export function MediaCard({ item, onSelect }: MediaCardProps) {
  const isImage = item.mediaType === 'image';
  const isVideo = item.mediaType === 'video';

  return (
    <Card
      className="group overflow-hidden transition-all hover:scale-105 cursor-pointer glass border-white/10"
      onClick={() => onSelect?.(item)}
    >
      <CardContent className="p-0 aspect-video relative bg-muted">
        {isImage ? (
          <Image
            src={item.fileUrl}
            alt={item.fileName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {isVideo ? (
              <VideoIcon className="h-12 w-12 text-muted-foreground" />
            ) : (
              <FileIcon className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-2">
        <div className="w-full space-y-1">
          <p className="truncate text-sm font-medium text-white">{item.fileName}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-white/60">
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </p>
            {item.tags?.length > 0 && (
              <div className="flex gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}