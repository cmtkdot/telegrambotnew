'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useChannels } from '@/hooks/use-channels';
import { useMedia } from '@/hooks/use-media';
import { Bot, FileIcon, MessageSquare, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { ActivityFeed } from '@/components/activity-feed';
import { BotControls } from '@/components/bot-controls';
import { StatsCards } from '@/components/stats-cards';

export default function HomePage() {
  const { data: channels } = useChannels();
  const { data: media } = useMedia();

  return (
    <>
      <SiteHeader className="glass" />
      <main className="container section-spacing space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 glow">
            Media Hub Dashboard
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Your centralized platform for managing Telegram media and channels
          </p>
        </div>

        {/* Stats Overview */}
        <StatsCards channels={channels} media={media} />

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Activity Feed */}
          <Card className="glass border-white/10 card-padding lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Activity
            </h2>
            <ActivityFeed />
          </Card>

          {/* Bot Controls */}
          <Card className="glass border-white/10 card-padding">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Bot Controls
            </h2>
            <BotControls />
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/channels">
            <Button className="w-full glass" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Channels
            </Button>
          </Link>
          <Link href="/media">
            <Button className="w-full glass" variant="outline">
              <FileIcon className="mr-2 h-4 w-4" />
              Media Library
            </Button>
          </Link>
          <Link href="/settings">
            <Button className="w-full glass" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href={`https://t.me/${env.telegram.botUsername}`} target="_blank">
            <Button className="w-full glass" variant="outline">
              <Bot className="mr-2 h-4 w-4" />
              Open Bot
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}