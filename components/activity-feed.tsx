'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { formatDistanceToNow } from 'date-fns';
import { FileIcon, ImageIcon, MessageSquare, VideoIcon } from 'lucide-react';

interface Activity {
  id: string;
  type: 'media' | 'message' | 'channel';
  title: string;
  description: string;
  created_at: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Subscribe to realtime updates
    const channel = supabase
      .channel('activity')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        // Handle different types of changes
        const newActivity = createActivityFromPayload(payload);
        if (newActivity) {
          setActivities((prev) => [newActivity, ...prev].slice(0, 10));
        }
      })
      .subscribe();

    // Initial fetch
    fetchRecentActivity();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // Fetch both media and channel updates
      const [mediaResponse, channelsResponse] = await Promise.all([
        supabase
          .from('media')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('channels')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      const activities: Activity[] = [];

      // Add media activities
      if (mediaResponse.data) {
        activities.push(
          ...mediaResponse.data.map((item) => ({
            id: item.id,
            type: 'media',
            title: item.file_name,
            description: `New ${item.media_type} uploaded`,
            created_at: item.created_at,
          }))
        );
      }

      // Add channel activities
      if (channelsResponse.data) {
        activities.push(
          ...channelsResponse.data.map((item) => ({
            id: item.id,
            type: 'channel',
            title: item.title,
            description: `Channel ${item.is_active ? 'activated' : 'deactivated'}`,
            created_at: item.created_at,
          }))
        );
      }

      // Sort by date and update state
      setActivities(
        activities
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 10)
      );
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const createActivityFromPayload = (payload: any): Activity | null => {
    // Handle different types of activities based on the payload
    return null;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      case 'video':
        return <VideoIcon className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-white/60 text-center py-8">No recent activity</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 glass rounded-lg p-3 md:p-4"
          >
            <div className="text-white/60">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-white">{activity.title}</p>
              <p className="text-sm text-white/60">{activity.description}</p>
            </div>
            <p className="text-xs text-white/40 whitespace-nowrap">
              {formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))
      )}
    </div>
  );
}