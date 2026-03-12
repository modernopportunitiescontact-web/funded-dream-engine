export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      copy_engine_status: {
        Row: {
          execution_status: string
          heartbeat_at: string
          id: string
          last_error: string | null
          last_trade_copied_at: string | null
          last_trade_detected_at: string | null
          listener_status: string
          master_id: string
          slave_id: string | null
          updated_at: string
        }
        Insert: {
          execution_status?: string
          heartbeat_at?: string
          id?: string
          last_error?: string | null
          last_trade_copied_at?: string | null
          last_trade_detected_at?: string | null
          listener_status?: string
          master_id: string
          slave_id?: string | null
          updated_at?: string
        }
        Update: {
          execution_status?: string
          heartbeat_at?: string
          id?: string
          last_error?: string | null
          last_trade_copied_at?: string | null
          last_trade_detected_at?: string | null
          listener_status?: string
          master_id?: string
          slave_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "copy_engine_status_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: true
            referencedRelation: "mt5_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      copy_links: {
        Row: {
          copy_settings: Json | null
          created_at: string
          id: string
          master_registration_id: string
          slave_registration_id: string
          status: string
        }
        Insert: {
          copy_settings?: Json | null
          created_at?: string
          id?: string
          master_registration_id: string
          slave_registration_id: string
          status?: string
        }
        Update: {
          copy_settings?: Json | null
          created_at?: string
          id?: string
          master_registration_id?: string
          slave_registration_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "copy_links_master_registration_id_fkey"
            columns: ["master_registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "copy_links_slave_registration_id_fkey"
            columns: ["slave_registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      execution_logs: {
        Row: {
          calculated_slave_lot: number | null
          created_at: string
          error_code: string | null
          error_message: string | null
          event_type: string | null
          execution_status: string
          id: string
          master_id: string | null
          master_ticket: string | null
          multiplier_used: number | null
          normalized_slave_lot: number | null
          request_payload: Json | null
          requested_master_lot: number | null
          response_payload: Json | null
          slave_id: string | null
          slave_ticket: string | null
          symbol: string | null
          trade_event_id: string | null
        }
        Insert: {
          calculated_slave_lot?: number | null
          created_at?: string
          error_code?: string | null
          error_message?: string | null
          event_type?: string | null
          execution_status?: string
          id?: string
          master_id?: string | null
          master_ticket?: string | null
          multiplier_used?: number | null
          normalized_slave_lot?: number | null
          request_payload?: Json | null
          requested_master_lot?: number | null
          response_payload?: Json | null
          slave_id?: string | null
          slave_ticket?: string | null
          symbol?: string | null
          trade_event_id?: string | null
        }
        Update: {
          calculated_slave_lot?: number | null
          created_at?: string
          error_code?: string | null
          error_message?: string | null
          event_type?: string | null
          execution_status?: string
          id?: string
          master_id?: string | null
          master_ticket?: string | null
          multiplier_used?: number | null
          normalized_slave_lot?: number | null
          request_payload?: Json | null
          requested_master_lot?: number | null
          response_payload?: Json | null
          slave_id?: string | null
          slave_ticket?: string | null
          symbol?: string | null
          trade_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "execution_logs_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: false
            referencedRelation: "mt5_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "execution_logs_trade_event_id_fkey"
            columns: ["trade_event_id"]
            isOneToOne: false
            referencedRelation: "trade_events"
            referencedColumns: ["id"]
          },
        ]
      }
      mt5_accounts: {
        Row: {
          account_type: string
          copy_enabled: boolean
          created_at: string
          deriv_token_encrypted: string | null
          id: string
          last_listener_heartbeat_at: string | null
          listener_status: string
          mt5_login: string | null
          mt5_password: string | null
          mt5_server: string | null
          multiplier: number
          registration_id: string
          sl_points: number | null
          status: string
          tp_points: number | null
          updated_at: string
        }
        Insert: {
          account_type?: string
          copy_enabled?: boolean
          created_at?: string
          deriv_token_encrypted?: string | null
          id?: string
          last_listener_heartbeat_at?: string | null
          listener_status?: string
          mt5_login?: string | null
          mt5_password?: string | null
          mt5_server?: string | null
          multiplier?: number
          registration_id: string
          sl_points?: number | null
          status?: string
          tp_points?: number | null
          updated_at?: string
        }
        Update: {
          account_type?: string
          copy_enabled?: boolean
          created_at?: string
          deriv_token_encrypted?: string | null
          id?: string
          last_listener_heartbeat_at?: string | null
          listener_status?: string
          mt5_login?: string | null
          mt5_password?: string | null
          mt5_server?: string | null
          multiplier?: number
          registration_id?: string
          sl_points?: number | null
          status?: string
          tp_points?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mt5_accounts_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: true
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          confirmed_at: string | null
          created_at: string
          currency: string
          id: string
          network: string
          registration_id: string | null
          status: string
          tx_hash: string | null
          user_id: string
        }
        Insert: {
          amount: number
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          network?: string
          registration_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          network?: string
          registration_id?: string | null
          status?: string
          tx_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_history: {
        Row: {
          changed_by: string
          created_at: string
          id: string
          new_status: string
          notes: string | null
          old_status: string
          registration_id: string
        }
        Insert: {
          changed_by: string
          created_at?: string
          id?: string
          new_status: string
          notes?: string | null
          old_status: string
          registration_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string
          registration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phase_history_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          account_type: string
          amount_paid: number | null
          archived_at: string | null
          capital_tier: string
          country: string | null
          created_at: string
          email: string | null
          fee_expected: number | null
          full_name: string | null
          id: string
          notes: string | null
          paid_at: string | null
          payment_address_used: string | null
          payment_method: string | null
          payment_status: string
          payment_txid: string | null
          phone: string | null
          plan_capital: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type?: string
          amount_paid?: number | null
          archived_at?: string | null
          capital_tier: string
          country?: string | null
          created_at?: string
          email?: string | null
          fee_expected?: number | null
          full_name?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_address_used?: string | null
          payment_method?: string | null
          payment_status?: string
          payment_txid?: string | null
          phone?: string | null
          plan_capital?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: string
          amount_paid?: number | null
          archived_at?: string | null
          capital_tier?: string
          country?: string | null
          created_at?: string
          email?: string | null
          fee_expected?: number | null
          full_name?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_address_used?: string | null
          payment_method?: string | null
          payment_status?: string
          payment_txid?: string | null
          phone?: string | null
          plan_capital?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      symbol_mappings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          master_symbol: string
          slave_symbol: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          master_symbol: string
          slave_symbol: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          master_symbol?: string
          slave_symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      trade_events: {
        Row: {
          created_at: string
          detected_at: string
          direction: string | null
          entry_price: number | null
          event_hash: string | null
          event_type: string
          id: string
          lot: number | null
          master_id: string
          master_mt5_login: string | null
          order_type: string | null
          position_id: string | null
          processed_at: string | null
          profit_loss: number | null
          raw_payload: Json | null
          status: string
          stop_loss: number | null
          symbol: string | null
          take_profit: number | null
          ticket: string
        }
        Insert: {
          created_at?: string
          detected_at?: string
          direction?: string | null
          entry_price?: number | null
          event_hash?: string | null
          event_type: string
          id?: string
          lot?: number | null
          master_id: string
          master_mt5_login?: string | null
          order_type?: string | null
          position_id?: string | null
          processed_at?: string | null
          profit_loss?: number | null
          raw_payload?: Json | null
          status?: string
          stop_loss?: number | null
          symbol?: string | null
          take_profit?: number | null
          ticket: string
        }
        Update: {
          created_at?: string
          detected_at?: string
          direction?: string | null
          entry_price?: number | null
          event_hash?: string | null
          event_type?: string
          id?: string
          lot?: number | null
          master_id?: string
          master_mt5_login?: string | null
          order_type?: string | null
          position_id?: string | null
          processed_at?: string | null
          profit_loss?: number | null
          raw_payload?: Json | null
          status?: string
          stop_loss?: number | null
          symbol?: string | null
          take_profit?: number | null
          ticket?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_events_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: false
            referencedRelation: "mt5_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_mappings: {
        Row: {
          closed_at: string | null
          created_at: string
          id: string
          mapping_status: string
          master_id: string
          master_lot: number | null
          master_position_id: string | null
          master_ticket: string
          multiplier_used: number | null
          opened_at: string | null
          slave_id: string | null
          slave_lot: number | null
          slave_position_id: string | null
          slave_ticket: string | null
          symbol: string | null
          updated_at: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          id?: string
          mapping_status?: string
          master_id: string
          master_lot?: number | null
          master_position_id?: string | null
          master_ticket: string
          multiplier_used?: number | null
          opened_at?: string | null
          slave_id?: string | null
          slave_lot?: number | null
          slave_position_id?: string | null
          slave_ticket?: string | null
          symbol?: string | null
          updated_at?: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          id?: string
          mapping_status?: string
          master_id?: string
          master_lot?: number | null
          master_position_id?: string | null
          master_ticket?: string
          multiplier_used?: number | null
          opened_at?: string | null
          slave_id?: string | null
          slave_lot?: number | null
          slave_position_id?: string | null
          slave_ticket?: string | null
          symbol?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_mappings_master_id_fkey"
            columns: ["master_id"]
            isOneToOne: false
            referencedRelation: "mt5_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_phone_unique: { Args: { _phone: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
