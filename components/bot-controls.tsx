'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bot, RefreshCw, Send } from 'lucide-react';
import { useState } from 'react';
import { env } from '@/lib/env';
import { toast } from 'sonner';

export function BotControls() {
  const [isActive, setIsActive] = useState(true);
  const [command, setCommand] = useState('');

  const handleSendCommand = async () => {
    if (!command.trim()) return;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${env.telegram.botApi}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '@xdelo_mediabot',
          text: command,
        }),
      });

      const data = await response.json();
      if (!data.ok) throw new Error(data.description);

      toast.success('Command sent successfully');
      setCommand('');
    } catch (error) {
      toast.error('Failed to send command');
    }
  };

  const handleToggleBot = (checked: boolean) => {
    setIsActive(checked);
    toast.success(`Bot ${checked ? 'activated' : 'deactivated'}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-white">Bot Status</Label>
          <p className="text-sm text-white/60">
            Toggle bot activity
          </p>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={handleToggleBot}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Send Command</Label>
        <div className="flex gap-2">
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="/command"
            className="glass border-white/10 flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendCommand}
            disabled={!command.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          variant="outline"
          className="w-full glass"
          onClick={() => toast.success('Bot refreshed')}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Bot
        </Button>
        <Button
          variant="outline"
          className="w-full glass"
          asChild
        >
          <a href={`https://t.me/${env.telegram.botUsername}`} target="_blank" rel="noopener noreferrer">
            <Bot className="mr-2 h-4 w-4" />
            Open in Telegram
          </a>
        </Button>
      </div>
    </div>
  );
}