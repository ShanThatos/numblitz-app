import { useCallback, useEffect, useRef, useState } from "react";
import { MathProblem } from "~/api/types";
import { Text } from "~/components/ui/text";
import { KatexWebView } from "~/components/views/katex";
import { DateTime } from "luxon";
import { View } from "react-native";
import QuizAnswerInput, { QuizAnswerInputHandle } from "./components/QuizInput";
import { QuizInputEvent } from "./components/QuizInputEvent";
import QuizKeyboard from "./components/QuizKeyboard";
import useKeyboardEvents from "./hooks/use-keyboard-events";
import useResetTabBarGoBack from "./hooks/use-reset-go-back";

const RemainingTime = ({
  endTime,
  onFinishTime,
}: {
  endTime: DateTime;
  onFinishTime?: () => void;
}) => {
  const [time, setTime] = useState(endTime.diffNow(["minutes", "seconds"]));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        if (time.minutes <= 0 && time.seconds <= 0) {
          clearInterval(interval);
          onFinishTime?.();
        }
        return endTime.diffNow(["minutes", "seconds"]);
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [endTime, onFinishTime]);
  return (
    <Text className="text-center font-mono font-bold">
      {time.toMillis() > 0 ? time.toFormat("m:ss") : "0:00"}
    </Text>
  );
};

interface QuizPageProps {
  problems: MathProblem[];
  title?: string;
  endTime?: DateTime;
  onFinish?: (answers: string[], reason: "end" | "time") => void;
}
export default function QuizPage({
  problems,
  title,
  endTime,
  onFinish,
}: QuizPageProps) {
  const resetTabBarGoBack = useResetTabBarGoBack();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswerChoice, setCurrentAnswerChoice] = useState<string | null>(
    null,
  );

  const inputRef = useRef<QuizAnswerInputHandle>(null);

  const alphas = problems[current].question
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[^a-zA-Z]/g, "");
  const fontSize = alphas.length > 5 ? "1.5em" : "2em";

  const handleKeyboardPress = useCallback(
    (event: QuizInputEvent) => {
      if (event.type === "submit") {
        setAnswers((answers) => {
          const newAnswers = [...answers];
          if (problems[current].format === "multiplechoice") {
            newAnswers[current] = currentAnswerChoice ?? "";
          } else {
            newAnswers[current] = inputRef.current?.getValue() ?? "";
          }
          setCurrentAnswerChoice(null);

          setCurrent((current) => {
            if (current === problems.length - 1) {
              onFinish?.(newAnswers, "end");
            }
            return Math.min(current + 1, problems.length - 1);
          });

          inputRef.current?.reset();
          return newAnswers;
        });
      } else if (event.type === "exit") {
        resetTabBarGoBack();
      } else if (event.type === "choice") {
        if (problems[current].format === "multiplechoice") {
          setCurrentAnswerChoice(event.value ?? null);
        }
      } else {
        inputRef.current?.handleEvent(event);
      }
    },
    [current, currentAnswerChoice, onFinish, problems, resetTabBarGoBack],
  );

  useKeyboardEvents(handleKeyboardPress);

  return (
    <View className="pt-safe flex-1 bg-white">
      <View className="flex flex-row items-center justify-between border-hairline border-neutral-300 bg-neutral-100 px-4">
        <View className="w-20 py-2">
          <Text className="text-center font-mono font-bold">{`${(current + 1).toString()}/${problems.length.toString()}`}</Text>
        </View>
        <Text className="text-center font-bold">{title}</Text>
        <View className="w-20 py-2">
          {endTime && (
            <RemainingTime
              endTime={endTime}
              onFinishTime={() => {
                onFinish?.(answers, "time");
              }}
            />
          )}
        </View>
      </View>
      <View className="flex-1 px-4 py-2">
        <View
          className={`flex-1 rounded-xl border-2 border-red-100 bg-brand-background p-5 shadow-sm ${problems[current].format === "multiplechoice" ? "flex flex-col items-stretch justify-center" : ""} `}
        >
          <KatexWebView
            source={problems[current].question}
            options={{
              fontSize,
              align: "center",
              textAlign: "center",
            }}
          />
          {problems[current].format !== "multiplechoice" && (
            <View className="flex-1 flex-row items-center justify-center gap-3">
              <QuizAnswerInput ref={inputRef} problem={problems[current]} />
              <Text className="font-Katex text-3xl">
                {problems[current].units}
              </Text>
            </View>
          )}
        </View>
      </View>
      <QuizKeyboard
        problem={problems[current]}
        currentAnswerChoice={currentAnswerChoice}
        onPress={handleKeyboardPress}
      />
    </View>
  );
}
