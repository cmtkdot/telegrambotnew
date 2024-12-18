'use client';

import { Button } from '@/components/ui/button';
import { Channel } from '@/types/channel';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface ChatHeaderProps {
  channel: Channel;
}

export function ChatHeader({ channel }: ChatHeaderProps) {
  return (
    <div className="p-4 glass border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/channels">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-lg font-semibold text-white">{channel.title}</h2>
          {channel.username && (
            <p className="text-sm text-white/60">@{channel.username}</p>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
}