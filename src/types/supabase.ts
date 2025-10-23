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
    PostgrestVersion: '12.2.12 (cd3cf9e)'
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'admin_users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string | null
          created_at: string
          id: string
          price: number
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          cart_id?: string | null
          created_at?: string
          id?: string
          price: number
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          cart_id?: string | null
          created_at?: string
          id?: string
          price?: number
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'cart_items_cart_id_fkey'
            columns: ['cart_id']
            isOneToOne: false
            referencedRelation: 'carts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          status: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          status?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          status?: boolean
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_no: number
          price: number | null
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_no: number
          price?: number | null
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          order_no?: number
          price?: number | null
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'order_items_order_no_fkey'
            columns: ['order_no']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['order_no']
          },
          {
            foreignKeyName: 'order_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          cancelled_at: string | null
          created_at: string
          delivered_at: string | null
          id: string
          memo: string | null
          order_no: number
          payment_method: string
          payment_status: Database['public']['Enums']['payment_status']
          shipped_at: string | null
          shipping_address: string
          shipping_fee: number
          status: Database['public']['Enums']['order_status']
          total_price: number
          tracking_no: string | null
          user_id: string | null
          zip_code: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          memo?: string | null
          order_no?: number
          payment_method: string
          payment_status?: Database['public']['Enums']['payment_status']
          shipped_at?: string | null
          shipping_address: string
          shipping_fee: number
          status: Database['public']['Enums']['order_status']
          total_price: number
          tracking_no?: string | null
          user_id?: string | null
          zip_code: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          memo?: string | null
          order_no?: number
          payment_method?: string
          payment_status?: Database['public']['Enums']['payment_status']
          shipped_at?: string | null
          shipping_address?: string
          shipping_fee?: number
          status?: Database['public']['Enums']['order_status']
          total_price?: number
          tracking_no?: string | null
          user_id?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: number
          img_order: number
          img_url: string
          product_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          img_order: number
          img_url: string
          product_id: number
        }
        Update: {
          created_at?: string
          id?: number
          img_order?: number
          img_url?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['product_id']
          },
        ]
      }
      products: {
        Row: {
          category_id: number
          created_at: string
          deleted_at: string | null
          description: string | null
          height: number | null
          id: string
          length: number | null
          name: string
          original_price: number
          price: number
          product_id: number
          seller_no: number
          shipping_fee: number
          sku: string
          sold_count: number
          status: Database['public']['Enums']['product_status']
          stock: number
          updated_at: string
          views: number
          weight: number | null
          width: number | null
        }
        Insert: {
          category_id: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          length?: number | null
          name: string
          original_price: number
          price?: number
          product_id?: number
          seller_no: number
          shipping_fee?: number
          sku: string
          sold_count?: number
          status: Database['public']['Enums']['product_status']
          stock?: number
          updated_at: string
          views?: number
          weight?: number | null
          width?: number | null
        }
        Update: {
          category_id?: number
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          height?: number | null
          id?: string
          length?: number | null
          name?: string
          original_price?: number
          price?: number
          product_id?: number
          seller_no?: number
          shipping_fee?: number
          sku?: string
          sold_count?: number
          status?: Database['public']['Enums']['product_status']
          stock?: number
          updated_at?: string
          views?: number
          weight?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_seller_no_fkey'
            columns: ['seller_no']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['user_no']
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar: string | null
          created_at: string
          detail_address: string | null
          email: string | null
          id: string
          last_sign_in_at: string | null
          name: string
          phone: string | null
          status: Database['public']['Enums']['user_status']
          user_no: number
          user_role: Database['public']['Enums']['user_role_enum'] | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar?: string | null
          created_at?: string
          detail_address?: string | null
          email?: string | null
          id: string
          last_sign_in_at?: string | null
          name: string
          phone?: string | null
          status?: Database['public']['Enums']['user_status']
          user_no?: number
          user_role?: Database['public']['Enums']['user_role_enum'] | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar?: string | null
          created_at?: string
          detail_address?: string | null
          email?: string | null
          id?: string
          last_sign_in_at?: string | null
          name?: string
          phone?: string | null
          status?: Database['public']['Enums']['user_status']
          user_no?: number
          user_role?: Database['public']['Enums']['user_role_enum'] | null
          zip_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_products_count_stats: {
        Args: never
        Returns: {
          active_count: number
          low_stock_count: number
          sold_out_count: number
          total_count: number
        }[]
      }
      get_products_with_main_image_paginated: {
        Args: { limit_count: number; offset_count: number }
        Returns: {
          category_name: string
          main_img_url: string
          name: string
          original_price: number
          price: number
          product_id: number
          status: string
          stock: number
        }[]
      }
    }
    Enums: {
      order_status:
        | 'ordered'
        | 'cancelled'
        | 'ready'
        | 'shipping'
        | 'delivered'
        | 'returned'
      payment_status: 'unpaid' | 'paid' | 'failed' | 'refunded'
      product_status: 'active' | 'sold_out' | 'paused' | 'deleted'
      user_role_enum: 'admin' | 'seller' | 'customer'
      user_status: 'active' | 'suspended' | 'deleted'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        'ordered',
        'cancelled',
        'ready',
        'shipping',
        'delivered',
        'returned',
      ],
      payment_status: ['unpaid', 'paid', 'failed', 'refunded'],
      product_status: ['active', 'sold_out', 'paused', 'deleted'],
      user_role_enum: ['admin', 'seller', 'customer'],
      user_status: ['active', 'suspended', 'deleted'],
    },
  },
} as const
