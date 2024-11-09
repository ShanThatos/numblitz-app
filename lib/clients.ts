import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";
import { Database } from "./database.types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_API_URL ?? "";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY ?? "";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    ...Platform.select({
      native: { storage: AsyncStorage },
      default: {},
    }),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const queryClient = new QueryClient();
