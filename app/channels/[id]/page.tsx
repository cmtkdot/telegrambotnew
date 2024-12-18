'use client';

import { SiteHeader } from '@/components/site-header';
import { useChannel } from '@/hooks/use-channels';
import { useMessages } from '@/hooks/use-messages';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ChatHeader } from '@/components/chat/chat-header';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';

export default function ChannelPage() {
  const { id } = useParams();
  const { data: channel, isLoading: isLoadingChannel } = useChannel(id as string);
  const { data: messages, isLoading: isLoadingMessages } = useMessages(
    channel?.chat_id ?? 0
  );

  if (isLoadingChannel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white/60">Channel not found</p>
      </div>
    );
  }

  return (
    <>
      <SiteHeader className="glass" />
      <main className="container py-6 max-w-5xl">
        <div className="glass rounded-lg overflow-hidden flex flex-col h-[calc(100vh-theme(spacing.24))]">
          <ChatHeader channel={channel} />
          <MessageList messages={messages ?? []} isLoading={isLoadingMessages} />
          <MessageInput
            onSend={(text) => console.log('Send message:', text)}
            onAttach={() => console.log('Attach file')}
          />
        </div>
      </main>
    </>
  );
}