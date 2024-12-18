export interface MediaItem {
  id: string;
  fileName: string;
  fileUrl: string;
  channelId?: string;
  mediaType: 'video' | 'document' | 'image';
  caption?: string;
  chatId?: number;
  createdAt: string;
  metadata?: Record<string, unknown>;
  tags?: string[];
}