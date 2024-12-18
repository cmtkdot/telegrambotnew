'use client';

import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@/components/auth/user-button';
import { ServerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-white/10", className)}>
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 mr-4 md:mr-8">
          <ServerIcon className="h-6 w-6 text-purple-400" />
          <span className="font-bold text-white hidden md:inline">Media Hub</span>
        </div>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}