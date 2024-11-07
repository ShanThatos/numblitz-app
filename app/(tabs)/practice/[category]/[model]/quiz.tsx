import { useCallback, useRef, useState } from "react";
import { useGenerateModelProblems } from "~/api/mathgen/generate";
import { useModel } from "~/api/models";
import { MathProblem } from "~/api/types";
import QuizPage from "~/components/screens/quiz/QuizPage";
import ReadyPage from "~/components/screens/quiz/ReadyPage";
import ResultsPage, {
  ResultsPageProps,
} from "~/components/screens/quiz/ResultsPage";
import { Text } from "~/components/ui/text";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { DateTime, Duration } from "luxon";

const PRACTICE_AMOUNT = 20;
const PRACTICE_DURATION = Duration.fromObject({ minutes: 5 });

export default function ModelQuizScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ category: string; model: string }>();

  const [quizState, setQuizState] = useState<"ready" | "active" | "finished">(
    "ready",
  );
  const calledOnFinish = useRef(false);
  const [quizStartTime, setQuizStartTime] = useState<DateTime | null>(null);
  const [problems, setProblems] = useState<MathProblem[] | null>(null);

  const [resultsProps, setResultsProps] = useState<Pick<
    ResultsPageProps,
    "model" | "problems" | "answers" | "time"
  > | null>(null);

  const { data: model, status: modelStatus } = useModel(params.model);

  const generateModelProblems = useGenerateModelProblems();
  const loadProblems = useCallback(
    (model: string) => {
      void generateModelProblems(model, PRACTICE_AMOUNT).then((response) => {
        setProblems(response.problems);
      });
    },
    [generateModelProblems],
  );

  const reset = () => {
    calledOnFinish.current = false;
    setQuizState("ready");
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "flex" },
    });
    setTimeout(() => {
      loadProblems(params.model);
    }, 0);
  };

  useFocusEffect(
    useCallback(() => {
      loadProblems(params.model);
      return () => {
        setProblems(null);
      };
    }, [loadProblems, params.model]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { display: "flex" },
        });
      };
    }, [navigation]),
  );

  const onStart = () => {
    setQuizState("active");
    setQuizStartTime(DateTime.now());
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });
  };

  const onFinish = (answers: string[], reason: "end" | "time") => {
    if (!model?.data || problems === null || quizStartTime === null) {
      return;
    }
    if (calledOnFinish.current) {
      return;
    }
    calledOnFinish.current = true;
    setResultsProps({
      model: { ...model.data },
      problems: [...problems],
      answers,
      time: DateTime.min(
        DateTime.now(),
        quizStartTime.plus(PRACTICE_DURATION),
      ).diff(quizStartTime),
    });
    setProblems(null);
    setQuizState("finished");
  };

  if (modelStatus !== "success" || !model.data) {
    return <Text>Loading...</Text>;
  }

  if (quizState === "ready") {
    return (
      <ReadyPage
        model={model.data}
        loading={problems === null}
        onStart={onStart}
      />
    );
  }

  if (quizState === "active") {
    if (problems === null) {
      return <Text>Loading...</Text>;
    }

    return (
      <QuizPage
        problems={problems}
        title={model.data.display_name}
        endTime={quizStartTime?.plus(PRACTICE_DURATION)}
        onFinish={onFinish}
      />
    );
  }

  if (resultsProps === null) {
    return <Text>Loading...</Text>;
  }

  return <ResultsPage {...resultsProps} onRetry={reset} />;
}
