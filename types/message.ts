export interface Message {
  id: string;
  chat_id: number;
  message_id: number;
  sender_name: string;
  text?: string;
  mediaType?: 'image' | 'video' | 'document';
  mediaUrl?: string;
  created_at: string;
}