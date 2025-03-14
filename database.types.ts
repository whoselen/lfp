export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accessibility_tools: {
        Row: {
          id: number
          inserted_at: string
          name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_servers: {
        Row: {
          id: number
          inserted_at: string
          name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          alternative_names: string[] | null
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          image_url: string | null
          name: string | null
        }
        Insert: {
          alternative_names?: string[] | null
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Update: {
          alternative_names?: string[] | null
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      ranks: {
        Row: {
          game_id: string | null
          id: number
          image_url: string | null
          inserted_at: string
          max_rating: number | null
          min_rating: number | null
          name: string
          rating_prefix: string | null
          updated_at: string
        }
        Insert: {
          game_id?: string | null
          id?: number
          image_url?: string | null
          inserted_at?: string
          max_rating?: number | null
          min_rating?: number | null
          name: string
          rating_prefix?: string | null
          updated_at?: string
        }
        Update: {
          game_id?: string | null
          id?: number
          image_url?: string | null
          inserted_at?: string
          max_rating?: number | null
          min_rating?: number | null
          name?: string
          rating_prefix?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ranks_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      room_accessibility_tools: {
        Row: {
          inserted_at: string
          room_id: number
          tool_id: number
        }
        Insert: {
          inserted_at?: string
          room_id: number
          tool_id: number
        }
        Update: {
          inserted_at?: string
          room_id?: number
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "roomaccessibilitytools_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roomaccessibilitytools_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "accessibility_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      room_chat: {
        Row: {
          content: string | null
          created_at: string
          id: number
          room_id: number
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          room_id: number
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          room_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      room_game_servers: {
        Row: {
          inserted_at: string
          room_id: number
          server_id: number
        }
        Insert: {
          inserted_at?: string
          room_id: number
          server_id: number
        }
        Update: {
          inserted_at?: string
          room_id?: number
          server_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "room_game_servers_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_game_servers_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "game_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      room_tags: {
        Row: {
          inserted_at: string
          room_id: number
          tag_id: number
        }
        Insert: {
          inserted_at?: string
          room_id: number
          tag_id: number
        }
        Update: {
          inserted_at?: string
          room_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "posttags_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posttags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      room_users: {
        Row: {
          created_at: string
          entered_at: string | null
          id: number
          left_at: string | null
          room_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          entered_at?: string | null
          id?: number
          left_at?: string | null
          room_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          entered_at?: string | null
          id?: number
          left_at?: string | null
          room_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          description: string
          game_id: string
          id: number
          inserted_at: string
          max_participants: number | null
          rank_id: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          description: string
          game_id: string
          id?: number
          inserted_at?: string
          max_participants?: number | null
          rank_id: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          description?: string
          game_id?: string
          id?: number
          inserted_at?: string
          max_participants?: number | null
          rank_id?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_rank_id_fkey"
            columns: ["rank_id"]
            isOneToOne: false
            referencedRelation: "ranks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          image_url: string | null
          inserted_at: string
          name: string
          updated_at: string
        }
        Insert: {
          id?: number
          image_url?: string | null
          inserted_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          id?: number
          image_url?: string | null
          inserted_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
