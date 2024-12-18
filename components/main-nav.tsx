'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FolderOpen, Home, MessageSquare, Settings } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function MainNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/',
    },
    {
      href: '/media',
      label: 'Media',
      icon: FolderOpen,
      active: pathname === '/media',
    },
    {
      href: '/channels',
      label: 'Channels',
      icon: MessageSquare,
      active: pathname.startsWith('/channels'),
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
      active: pathname === '/settings',
    },
  ];

  const onNavigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Button
              key={route.href}
              variant={route.active ? 'secondary' : 'ghost'}
              asChild
            >
              <Link
                href={route.href}
                className={cn(
                  'flex items-center space-x-2 text-sm font-medium transition-colors',
                  route.active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="glass border-r border-white/10 w-64">
          <nav className="flex flex-col space-y-2 mt-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Button
                  key={route.href}
                  variant={route.active ? 'secondary' : 'ghost'}
                  className="justify-start"
                  onClick={() => onNavigate(route.href)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {route.label}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}