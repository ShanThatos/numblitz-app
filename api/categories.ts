import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const useCategories = () => {
  return useQueryFocusRefetch({
    queryKey: ["categories"],
    queryFn: async () =>
      await supabase
        .from("mathgen_categories")
        .select("*")
        .order("order", { ascending: true })
        .throwOnError(),
  });
};
