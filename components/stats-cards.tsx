'use client';

import { Card } from '@/components/ui/card';
import { Channel } from '@/types/channel';
import { MediaItem } from '@/types/media';
import { FileIcon, Users, Video, Image } from 'lucide-react';

interface StatsCardsProps {
  channels?: Channel[];
  media?: MediaItem[];
}

export function StatsCards({ channels, media }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Channels',
      value: channels?.filter(c => c.is_active)?.length ?? 0,
      icon: Users,
      description: `${channels?.length ?? 0} total channels`,
    },
    {
      title: 'Media Files',
      value: media?.length ?? 0,
      icon: FileIcon,
      description: 'Total media items',
    },
    {
      title: 'Videos',
      value: media?.filter(m => m.mediaType === 'video').length ?? 0,
      icon: Video,
      description: 'Video files',
    },
    {
      title: 'Images',
      value: media?.filter(m => m.mediaType === 'image').length ?? 0,
      icon: Image,
      description: 'Image files',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass border-white/10 card-padding">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/60">{stat.title}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{stat.value}</h3>
              <p className="text-xs text-white/40 mt-1">{stat.description}</p>
            </div>
            <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-white/20" />
          </div>
        </Card>
      ))}
    </div>
  );
}