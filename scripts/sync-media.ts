import { supabase } from '@/lib/supabase-client';
import { MediaItem } from '@/types/media';

async function syncMedia() {
  try {
    // Fetch all media items
    const { data: media, error } = await supabase
      .from('media')
      .select(`
        *,
        media_tags (
          tag_id
        )
      `);

    if (error) throw error;

    // Process and validate media items
    const validatedMedia: MediaItem[] = media.map(item => ({
      id: item.id,
      fileName: item.file_name,
      fileUrl: item.file_url,
      mediaType: item.media_type,
      channelId: item.chat_id?.toString(),
      caption: item.caption,
      createdAt: item.created_at,
      tags: item.media_tags?.map(tag => tag.tag_id) || [],
    }));

    console.log(`Synced ${validatedMedia.length} media items`);
    return validatedMedia;
  } catch (error) {
    console.error('Error syncing media:', error);
    throw error;
  }
}

export { syncMedia };