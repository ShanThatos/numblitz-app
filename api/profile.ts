import { useUser } from "~/components/contexts/session";
import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const useProfile = () => {
  const user = useUser();
  const id = user?.id ?? "";

  const results = useQueryFocusRefetch({
    queryKey: ["profile", id],
    queryFn: async () =>
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()
        .throwOnError(),
    enabled: !!id,
  });

  return results;
};
