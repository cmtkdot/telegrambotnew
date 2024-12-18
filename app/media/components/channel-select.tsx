'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Channel } from '@/types/channel';

interface ChannelSelectProps {
  channels: Channel[];
  value?: string;
  onChange: (value: string) => void;
}

export function ChannelSelect({ channels, value, onChange }: ChannelSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full glass border-white/10">
        <SelectValue placeholder="All Channels" />
      </SelectTrigger>
      <SelectContent className="glass border-white/10">
        <SelectItem value="all-channels">All Channels</SelectItem>
        {channels.map((channel) => (
          <SelectItem key={channel.id} value={channel.id}>
            {channel.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}