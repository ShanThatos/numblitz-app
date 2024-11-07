import { useUser } from "~/components/contexts/session";
import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const useDashboardCompleteScore = () => {
  const user = useUser();
  const id = user?.id ?? "";
  return useQueryFocusRefetch({
    queryKey: ["dashboard", "complete", id],
    queryFn: async () =>
      await supabase
        .from("dashboard_completed_scores_view")
        .select("*")
        .eq("user_id", id)
        .maybeSingle()
        .throwOnError(),
  });
};

export const useDashboardAverageScore = () => {
  const user = useUser();
  const id = user?.id ?? "";
  return useQueryFocusRefetch({
    queryKey: ["dashboard", "average", id],
    queryFn: async () =>
      await supabase
        .from("dashboard_average_scores_view")
        .select("*")
        .eq("user_id", id)
        .maybeSingle()
        .throwOnError(),
  });
};

export const useDashboardTrickOfTheDay = () => {
  return useQueryFocusRefetch({
    queryKey: ["dashboard", "trick-of-the-day"],
    queryFn: async () =>
      await supabase.rpc("get_trick_of_the_day").single().throwOnError(),
  });
};
