import type { MoodValue, PriorityValue, FinanceCategoryValue, TransactionTypeValue, TaskStatusValue } from "@/lib/constants";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      journals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          mood: MoodValue | null;
          tags: string[];
          entry_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          mood?: MoodValue | null;
          tags?: string[];
          entry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          mood?: MoodValue | null;
          tags?: string[];
          entry_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: TransactionTypeValue;
          amount: number;
          category: FinanceCategoryValue;
          description: string | null;
          transaction_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: TransactionTypeValue;
          amount: number;
          category: FinanceCategoryValue;
          description?: string | null;
          transaction_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: TransactionTypeValue;
          amount?: number;
          category?: FinanceCategoryValue;
          description?: string | null;
          transaction_date?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          due_date: string | null;
          priority: PriorityValue;
          status: TaskStatusValue;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          due_date?: string | null;
          priority?: PriorityValue;
          status?: TaskStatusValue;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          due_date?: string | null;
          priority?: PriorityValue;
          status?: TaskStatusValue;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type JournalEntry = Database["public"]["Tables"]["journals"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
