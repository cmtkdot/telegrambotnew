'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { MediaItem } from '@/types/media';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { FileIcon, VideoIcon } from 'lucide-react';

interface MediaPreviewModalProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MediaPreviewModal({ item, isOpen, onClose }: MediaPreviewModalProps) {
  if (!item) return null;

  const isImage = item.mediaType === 'image';
  const isVideo = item.mediaType === 'video';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass sm:max-w-[800px] border-white/10">
        <DialogTitle className="text-xl font-semibold text-white mb-4">
          Media Preview
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
            {isImage ? (
              <Image
                src={item.fileUrl}
                alt={item.fileName}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                {isVideo ? (
                  <VideoIcon className="h-20 w-20 text-muted-foreground" />
                ) : (
                  <FileIcon className="h-20 w-20 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">{item.fileName}</h2>
            <p className="text-sm text-white/60">
              Added {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </p>
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}