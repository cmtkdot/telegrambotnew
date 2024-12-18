'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { Moon, Sun, Bot, Bell, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { session } = useAuth();

  return (
    <>
      <SiteHeader className="glass" />
      <main className="container py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white glow mb-2">Settings</h1>
          <p className="text-white/60">Manage your preferences and account settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Appearance */}
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Dark Mode</Label>
                  <p className="text-sm text-white/60">
                    Toggle between light and dark themes
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
            </div>
          </Card>

          {/* Bot Settings */}
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Telegram Bot
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                Connect with our Telegram bot to start managing your media
              </p>
              <Button 
                className="w-full glass"
                asChild
              >
                <a 
                  href={`https://t.me/${env.telegram.botUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                Open Telegram Bot
                </a>
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-sm text-white/60">
                    Get notified about new media and updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-white/60">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <p className="text-sm text-white/60">
                  {session?.user?.email}
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}