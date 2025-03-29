import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const getCategories = async () => {
  return await supabase
    .from("mathgen_categories")
    .select("*")
    .order("order", { ascending: true })
    .throwOnError();
};

export const useCategories = () => {
  return useQueryFocusRefetch({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
