export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      mathgen_categories: {
        Row: {
          display_image: string;
          display_name: string;
          hidden: boolean;
          id: number;
          name: string;
          order: number;
        };
        Insert: {
          display_image: string;
          display_name: string;
          hidden?: boolean;
          id?: number;
          name: string;
          order?: number;
        };
        Update: {
          display_image?: string;
          display_name?: string;
          hidden?: boolean;
          id?: number;
          name?: string;
          order?: number;
        };
        Relationships: [];
      };
      mathgen_models: {
        Row: {
          category_name: string;
          code: string;
          created_at: string;
          difficulty: number;
          display_image: string;
          display_image_equation: string;
          display_name: string;
          explanation: string;
          format: string;
          hidden: boolean;
          id: number;
          name: string;
          order: number;
          rtl: boolean;
          units: string;
        };
        Insert: {
          category_name?: string;
          code?: string;
          created_at?: string;
          difficulty?: number;
          display_image?: string;
          display_image_equation?: string;
          display_name?: string;
          explanation?: string;
          format?: string;
          hidden?: boolean;
          id?: number;
          name?: string;
          order?: number;
          rtl?: boolean;
          units?: string;
        };
        Update: {
          category_name?: string;
          code?: string;
          created_at?: string;
          difficulty?: number;
          display_image?: string;
          display_image_equation?: string;
          display_name?: string;
          explanation?: string;
          format?: string;
          hidden?: boolean;
          id?: number;
          name?: string;
          order?: number;
          rtl?: boolean;
          units?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mathgen_models_category_name_fkey";
            columns: ["category_name"];
            isOneToOne: false;
            referencedRelation: "mathgen_categories";
            referencedColumns: ["name"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          recently_viewed: string;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          recently_viewed?: string;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          recently_viewed?: string;
        };
        Relationships: [];
      };
      scores: {
        Row: {
          created_at: string;
          id: number;
          model_id: number;
          result: Json;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          model_id: number;
          result: Json;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          model_id?: number;
          result?: Json;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scores_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "mathgen_models";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scores_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "mathgen_models_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scores_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      dashboard_average_scores_view: {
        Row: {
          average: number | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scores_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      dashboard_completed_scores_view: {
        Row: {
          complete: number | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scores_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      mathgen_models_view: {
        Row: {
          category_name: string;
          created_at: string;
          difficulty: number;
          display_image: string;
          display_name: string;
          explanation: string;
          id: number;
          name: string;
          order: number;
        };
        Insert: {
          category_name?: string;
          created_at?: string;
          difficulty?: number;
          display_image?: string;
          display_name?: string;
          explanation?: string;
          id?: number;
          name?: string;
          order?: number;
        };
        Update: {
          category_name?: string;
          created_at?: string;
          difficulty?: number;
          display_image?: string;
          display_name?: string;
          explanation?: string;
          id?: number;
          name?: string;
          order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "mathgen_models_category_name_fkey";
            columns: ["category_name"];
            isOneToOne: false;
            referencedRelation: "mathgen_categories";
            referencedColumns: ["name"];
          },
        ];
      };
      models_top_practice_quiz_scores_view: {
        Row: {
          model_id: number | null;
          topscores: number[] | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scores_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "mathgen_models";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scores_model_id_fkey";
            columns: ["model_id"];
            isOneToOne: false;
            referencedRelation: "mathgen_models_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scores_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      get_numblitz_server: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_trick_of_the_day: {
        Args: Record<PropertyKey, never>;
        Returns: {
          category_name: string;
          created_at: string;
          difficulty: number;
          display_image: string;
          display_name: string;
          explanation: string;
          id: number;
          name: string;
          order: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
