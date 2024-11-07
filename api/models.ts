import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const useModels = () => {
  return useQueryFocusRefetch({
    queryKey: ["models"],
    queryFn: async () =>
      await supabase
        .from("mathgen_models_view")
        .select(
          "id, name, category_name, display_name, display_image, difficulty",
        )
        .order("order", { ascending: true })
        .throwOnError(),
  });
};

export const useModelsByCategory = (categoryName: string) => {
  return useQueryFocusRefetch({
    queryKey: ["models-by-category", categoryName],
    queryFn: async () =>
      await supabase
        .from("mathgen_models_view")
        .select(
          "name, category_name, display_name, display_image, order, difficulty",
        )
        .eq("category_name", categoryName)
        .order("order", { ascending: true })
        .throwOnError(),
  });
};

export const useModel = (modelName: string) => {
  return useQueryFocusRefetch({
    queryKey: ["model", modelName],
    queryFn: async () =>
      await supabase
        .from("mathgen_models_view")
        .select("*")
        .eq("name", modelName)
        .single()
        .throwOnError(),
  });
};

export const useModelById = (modelId?: number) => {
  return useQueryFocusRefetch({
    queryKey: ["model-by-id", modelId],
    queryFn: async () =>
      await supabase
        .from("mathgen_models_view")
        .select("*")
        .eq("id", modelId ?? -1)
        .single()
        .throwOnError(),
    enabled: modelId !== undefined,
  });
};
