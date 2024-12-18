import { supabase } from '@/lib/supabase-client';
import { env } from '@/lib/env';

interface TelegramChannel {
  id: number;
  title: string;
  username?: string;
  type: string;
}

async function fetchTelegramChannels(): Promise<TelegramChannel[]> {
  const response = await fetch(`https://api.telegram.org/bot${env.telegram.botApi}/getUpdates`);
  const data = await response.json();
  
  if (!data.ok) {
    throw new Error('Failed to fetch Telegram updates');
  }

  // Extract unique channels from updates
  const channels = new Map<number, TelegramChannel>();
  data.result.forEach((update: any) => {
    if (update.message?.chat) {
      const chat = update.message.chat;
      if (chat.type === 'channel' || chat.type === 'supergroup') {
        channels.set(chat.id, {
          id: chat.id,
          title: chat.title,
          username: chat.username,
          type: chat.type,
        });
      }
    }
  });

  return Array.from(channels.values());
}

async function syncChannels() {
  try {
    console.log('Fetching Telegram channels...');
    const channels = await fetchTelegramChannels();
    
    console.log(`Found ${channels.length} channels`);
    
    for (const channel of channels) {
      const { data, error } = await supabase
        .from('channels')
        .upsert({
          chat_id: channel.id,
          title: channel.title,
          username: channel.username,
          is_active: true,
        }, {
          onConflict: 'chat_id',
        });
        
      if (error) {
        console.error(`Error syncing channel ${channel.title}:`, error);
      } else {
        console.log(`Synced channel: ${channel.title}`);
      }
    }
  } catch (error) {
    console.error('Error syncing channels:', error);
  }
}

async function main() {
  await syncChannels();
}

main();