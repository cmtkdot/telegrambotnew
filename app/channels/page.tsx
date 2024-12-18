'use client';

import { SiteHeader } from '@/components/site-header';
import { useChannels } from '@/hooks/use-channels';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ChannelsPage() {
  const { data: channels, isLoading, error } = useChannels();

  return (
    <>
      <SiteHeader className="glass" />
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white glow">Channels</h1>
              <p className="text-white/60">Manage your connected Telegram channels</p>
            </div>
            <Button className="glass">
              <Plus className="mr-2 h-4 w-4" />
              Add Channel
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-white/60" />
            </div>
          ) : error ? (
            <div className="rounded-lg glass p-8 text-center">
              <p className="text-white/60">Error loading channels</p>
            </div>
          ) : channels?.length === 0 ? (
            <div className="rounded-lg glass p-8 text-center">
              <p className="text-white/60">No channels found</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {channels?.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/channels/${channel.id}`}
                  className="block"
                >
                  <div className="glass rounded-lg p-6 transition-all hover:scale-105">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {channel.title}
                    </h2>
                    {channel.username && (
                      <p className="text-white/60 mb-4">@{channel.username}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          channel.is_active
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm text-white/60">
                        {channel.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}