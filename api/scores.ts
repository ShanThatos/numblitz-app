import { useUser } from "~/components/contexts/session";
import { supabase } from "~/lib/clients";
import { useQueryFocusRefetch } from "./utils";

export const useTopPracticeQuizScores = (modelId?: number) => {
  const user = useUser();
  const id = user?.id ?? "";

  return useQueryFocusRefetch({
    queryKey: ["model-top-practice-quiz-scores", modelId, id],
    queryFn: async () =>
      await supabase
        .from("models_top_practice_quiz_scores_view")
        .select("*")
        .eq("model_id", modelId ?? -1)
        .eq("user_id", id)
        .maybeSingle()
        .throwOnError(),
    enabled: !!id && modelId !== undefined,
  });
};

export const usePracticeQuizScores = () => {
  const user = useUser();
  const id = user?.id ?? "";
  return useQueryFocusRefetch({
    queryKey: ["practice-quiz-scores", id],
    queryFn: async () =>
      await supabase
        .from("scores")
        .select("*")
        .eq("user_id", id)
        .eq("type", "practice_quiz")
        .order("created_at", { ascending: false })
        .throwOnError(),
    enabled: !!id,
  });
};

export const usePracticeQuizScore = (quizId: number) => {
  const user = useUser();
  const id = user?.id ?? "";
  return useQueryFocusRefetch({
    queryKey: ["practice-quiz-score", id, quizId],
    queryFn: async () =>
      await supabase
        .from("scores")
        .select("*")
        .eq("user_id", id)
        .eq("type", "practice_quiz")
        .eq("id", quizId)
        .single()
        .throwOnError(),
    enabled: !!id,
  });
};
