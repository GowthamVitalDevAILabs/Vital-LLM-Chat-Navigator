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
      llm_links: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          url: string
          model: string | null
          category: string[] | null
          isPopular: boolean
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          url: string
          model?: string | null
          category?: string[] | null
          isPopular?: boolean
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          url?: string
          model?: string | null
          category?: string[] | null
          isPopular?: boolean
          tags?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
