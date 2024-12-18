'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  onAttach?: () => void;
}

export function MessageInput({ onSend, onAttach }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 glass border-t border-white/10">
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onAttach}
          className="text-white/60 hover:text-white"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="glass border-white/10"
        />
        <Button type="submit" size="icon" disabled={!text.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}