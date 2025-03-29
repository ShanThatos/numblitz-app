import { useModelById } from "~/api/models";
import { usePracticeQuizScore } from "~/api/scores";
import { PracticeQuizScoreResult } from "~/api/types";
import { Button } from "~/components/ui/button";
import { Text, TextClassContext } from "~/components/ui/text";
import { KatexWebView } from "~/components/views/katex";
import { buildQuestionsAnswersHtmlPage } from "~/lib/html";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Duration } from "luxon";
import { ScrollView, View } from "react-native";

export default function ProfileHistoryQuizScreen() {
  const navigation = useNavigation();
  const quizId = parseInt(useLocalSearchParams<{ id: string }>().id);
  const quizData = usePracticeQuizScore(quizId).data?.data;
  const model = useModelById(quizData?.model_id).data?.data;

  if (!quizData || !model) {
    return null;
  }

  const result = quizData.result as unknown as PracticeQuizScoreResult;
  const { score, problems, answers, correct, time: timeSeconds } = result;

  const time = Duration.fromObject({ seconds: timeSeconds });
  const averageTime = time.as("seconds") / answers.length;
  const { minutes, seconds } = time.shiftTo("minutes", "seconds");

  const splitTitle = model.display_name.split("\n");
  const mainTitle = splitTitle[0];
  const subTitle = splitTitle.slice(1).join("\n");

  return (
    <View className="pt-safe web:pb-safe flex flex-1 flex-col bg-white web:pt-2">
      <View className="px-3">
        <View className="flex flex-col items-center gap-2 rounded-xl border-2 border-red-200 bg-brand-background p-5 shadow-sm">
          <Text className="text-2xl">Quiz Results</Text>
          <Text
            className={`text-4xl ${score >= 80 ? "text-green-600" : "text-red-600"}`}
          >
            {score.toFixed(0)}%
          </Text>
          <View>
            <Text className="text-center text-xl">{mainTitle}</Text>
            {subTitle && (
              <Text className="text-center text-lg leading-tight text-neutral-700">
                {subTitle}
              </Text>
            )}
          </View>
          <View className="flex flex-row items-center justify-center gap-8 self-stretch">
            <TextClassContext.Provider value="text-lg">
              <View className="flex flex-1 flex-col items-end justify-start">
                <Text numberOfLines={1}>Correct</Text>
                <Text numberOfLines={1}>Total time</Text>
                <Text numberOfLines={1}>Average time</Text>
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
        <Button className="flex-1 bg-sky-600" onPress={navigation.goBack}>
          <Text>Go Back</Text>
        </Button>
      </View>
    </View>
  );
}
