import { useState } from "react";
import { MathProblem } from "~/api/types";
import { useUser } from "~/components/contexts/session";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Text, TextClassContext } from "~/components/ui/text";
import { KatexWebView } from "~/components/views/katex";
import { supabase } from "~/lib/clients";
import { Json, Tables } from "~/lib/database.types";
import { buildQuestionsAnswersHtmlPage } from "~/lib/html";
import { Duration } from "luxon";
import { Pressable, ScrollView, View } from "react-native";
import { useResetTabBarGoBack } from "./common";

export interface ResultsPageProps {
  model: Tables<"mathgen_models_view">;
  problems: MathProblem[];
  answers: string[];
  time: Duration;
  onRetry: () => void;
}

export default function ResultsPage({
  model,
  problems,
  answers,
  time,
  onRetry,
}: ResultsPageProps) {
  const user = useUser();
  const resetTabBarGoBack = useResetTabBarGoBack();
  const [saveState, setSaveState] = useState<
    "idle" | "nouser" | "saving" | "saved"
  >("idle");
  const [savedDialogOpen, setSavedDialogOpen] = useState(false);

  const correct = answers
    .map((answer, index): number => (answer === problems[index].answer ? 1 : 0))
    .reduce((a, b) => a + b, 0);

  const score = (correct * 100.0) / problems.length;
  const averageTime = time.as("seconds") / answers.length;

  const { minutes, seconds } = time.shiftTo("minutes", "seconds");

  const onSave = async () => {
    if (!user) {
      setSaveState("nouser");
      return;
    }
    if (saveState === "saved") {
      setSavedDialogOpen(true);
    }
    if (saveState !== "idle") {
      return;
    }

    setSaveState("saving");
    try {
      await supabase
        .from("scores")
        .insert({
          user_id: user.id,
          model_id: model.id,
          type: "practice_quiz",
          result: {
            score,
            correct,
            total: problems.length,
            time: time.as("seconds"),
            problems: problems as unknown as Json,
            answers,
          },
        })
        .throwOnError();
      setSaveState("saved");
      setSavedDialogOpen(true);
    } catch (error) {
      console.error(error);
      setSaveState("idle");
    }
  };

  return (
    <>
      <View className="pt-safe pb-safe flex flex-1 flex-col bg-white">
        <View className="px-3">
          <View className="flex flex-col items-center gap-2 rounded-xl border-2 border-red-200 bg-brand-background p-5 shadow-sm">
            <Text className="text-2xl">Quiz Results</Text>
            <Text
              className={`text-4xl ${score >= 80 ? "text-green-600" : "text-red-600"}`}
            >
              {score.toFixed(0)}%
            </Text>
            <Text className="text-center text-xl">{model.display_name}</Text>
            <View className="flex flex-row items-center justify-center gap-8">
              <TextClassContext.Provider value="text-lg">
                <View className="flex flex-1 flex-col items-end justify-start">
                  <Text>Correct</Text>
                  <Text>Total time</Text>
                  <Text>Average time</Text>
                </View>
                <View className="flex flex-1 flex-col items-start justify-start">
                  <Text>
                    {correct}/{problems.length}
                  </Text>
                  <Text>
                    {minutes === 0 ? "" : `${minutes.toString()} mins`}
                    {minutes && seconds ? " " : ""}
                    {seconds === 0 ? "" : `${seconds.toFixed(0)}s`}
                  </Text>
                  <Text>{averageTime.toFixed(1)}s</Text>
                </View>
              </TextClassContext.Provider>
            </View>
          </View>
        </View>
        <View className="flex-1 gap-0.5 pt-3">
          <View className="mx-2 border-b-hairline border-neutral-400">
            <Text className="px-3 text-2xl">Questions</Text>
          </View>
          <ScrollView className="flex-1" bounces={false}>
            <View className="flex-1">
              <KatexWebView
                source={buildQuestionsAnswersHtmlPage(problems, answers)}
              />
            </View>
          </ScrollView>
        </View>
        <View className="flex flex-row gap-2 border-t-hairline border-neutral-400 p-2">
          <Button className="flex-1 bg-sky-600" onPress={resetTabBarGoBack}>
            <Text>Go Back</Text>
          </Button>
          <Button
            className="flex-1 bg-green-600"
            onPress={() => {
              void onSave();
            }}
            disabled={saveState === "saving"}
          >
            <Text>Save</Text>
          </Button>
          <Button className="flex-1 bg-brand-dark" onPress={onRetry}>
            <Text>Retry</Text>
          </Button>
        </View>
      </View>
      {user ? (
        <Dialog open={savedDialogOpen} onOpenChange={setSavedDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Saved!</DialogTitle>
              <DialogDescription>
                Your quiz results have been saved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Pressable className="flex flex-row items-center justify-center rounded bg-green-600 p-2 active:opacity-80">
                  <Text className="text-white">Ok</Text>
                </Pressable>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={saveState === "nouser"}
          onOpenChange={(value) => {
            if (!value) {
              setSaveState("idle");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in!</DialogTitle>
              <DialogDescription>
                Sign in on the home page to save your progress.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Pressable className="flex flex-row items-center justify-center rounded bg-brand-dark p-2 active:opacity-80">
                  <Text className="text-white">Ok</Text>
                </Pressable>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
