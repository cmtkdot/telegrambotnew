import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-client';
import { MediaItem } from '@/types/media';
import { toast } from 'sonner';

interface UseMediaOptions {
  channelId?: string;
  type?: string;
  tag?: string;
}

export function useMedia({ channelId, type, tag }: UseMediaOptions = {}) {
  return useQuery({
    queryKey: ['media', { channelId, type, tag }],
    queryFn: async () => {
      let query = supabase.from('media').select('*, media_tags(tag_id)');

      if (channelId) {
        query = query.eq('chat_id', channelId);
      }
      if (type) {
        query = query.eq('media_type', type);
      }
      if (tag) {
        query = query.eq('media_tags.tag_id', tag);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data as MediaItem[];
    },
  });
}

export function useMediaItem(id: string) {
  return useQuery({
    queryKey: ['media', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*, media_tags(tag_id)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as MediaItem;
    },
    enabled: !!id,
  });
}

export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<MediaItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('media')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update media');
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('media').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete media');
    },
  });
}