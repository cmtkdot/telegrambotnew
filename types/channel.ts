export interface Channel {
  id: string;
  chat_id: number;
  title: string;
  username?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}