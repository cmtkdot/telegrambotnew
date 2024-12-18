'use client';

import { Message } from '@/types/message';
import { formatDistanceToNow } from 'date-fns';
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isMedia = message.mediaType !== undefined;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-white">
          {message.sender_name}
        </span>
        <span className="text-xs text-white/60">
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
        </span>
      </div>
      <div className="glass rounded-lg p-4 max-w-[80%]">
        {message.text && (
          <p className="text-white whitespace-pre-wrap">{message.text}</p>
        )}
        {isMedia && (
          <div className="mt-2">
            {message.mediaType === 'image' ? (
              <div className="relative aspect-video rounded-md overflow-hidden">
                <Image
                  src={message.mediaUrl}
                  alt="Message attachment"
                  fill
                  className="object-cover"
                />
              </div>
            ) : message.mediaType === 'video' ? (
              <div className="flex items-center space-x-2 text-white/60">
                <VideoIcon className="h-5 w-5" />
                <span>Video attachment</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-white/60">
                <FileIcon className="h-5 w-5" />
                <span>File attachment</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}