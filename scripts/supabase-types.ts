// Generated types from Supabase database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channels: {
        Row: {
          id: string
          chat_id: number
          title: string
          username: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          chat_id: number
          title: string
          username?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          chat_id?: number
          title?: string
          username?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          metadata: Json | null
          media_type: string | null
          chat_id: number | null
          caption: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_url: string
          metadata?: Json | null
          media_type?: string | null
          chat_id?: number | null
          caption?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          metadata?: Json | null
          media_type?: string | null
          chat_id?: number | null
          caption?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_tags: {
        Row: {
          media_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          media_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          media_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: number
          message_id: number
          sender_name: string
          text: string | null
          media_type: string | null
          media_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: number
          message_id: number
          sender_name: string
          text?: string | null
          media_type?: string | null
          media_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: number
          message_id?: number
          sender_name?: string
          text?: string | null
          media_type?: string | null
          media_url?: string | null
          created_at?: string
        }
      }
    }
  }
}