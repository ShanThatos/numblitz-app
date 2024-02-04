import { Octicons } from "@expo/vector-icons"
import { MotiView } from "moti"
import { useRef, useState } from "react"
import { View } from "react-native"

import QuizAnswerInput, { QuizAnswerInputHandle } from "./QuizAnswerInput"
import QuizKeyboard from "./QuizKeyboard"
import { MathProblem, ProblemModel } from "../../hooks/requests/models"
import {
  FlexRowCenter,
  FullFlexCol,
  FullFlexColCenter,
  KatexText,
} from "../base"
import MathView from "../math/MathView"

export interface QuizScreenProps {
  submitAnswer: (answer: string) => boolean
  model: ProblemModel
  problem: MathProblem
}

export default function QuizScreen({
  model,
  problem,
  submitAnswer,
}: QuizScreenProps) {
  const inputRef = useRef<QuizAnswerInputHandle>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | "">("")
  const [resultTimeout, setResultTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )

  const resultDelayTime = 1000
  const resultDisplayTime = 2000

  return (
    <FullFlexCol className="bg-primary p-5" style={{ gap: 10 }}>
      <View className="absolute right-3 top-3">
        {result && (
          <MotiView
            className={`flex aspect-square w-10 flex-col items-center justify-center rounded-lg ${
              result === "correct" ? "bg-green-500" : "bg-red-500"
            }`}
            from={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            delay={resultDelayTime}
            transition={{ duration: resultDisplayTime }}
          >
            {result === "correct" ? (
              <Octicons name="check-circle" size={24} color="white" />
            ) : (
              <Octicons name="x-circle" size={24} color="white" />
            )}
          </MotiView>
        )}
      </View>

      <MathView
        className="h-20 max-w-full"
        contents={problem.question}
        options={{ center: true, fontSize: "1.5em" }}
      />
      <FlexRowCenter className="h-28">
        <QuizAnswerInput model={model} problem={problem} ref={inputRef} />
        {problem.units && (
          <View className="w-0 overflow-visible">
            <KatexText className="w-40 pl-2 text-3xl">
              {problem.units}
            </KatexText>
          </View>
        )}
      </FlexRowCenter>
      <FullFlexColCenter>
        <QuizKeyboard
          problem={problem}
          onEvent={(event) => {
            if (event.type === "submit") {
              setResult("")
              const answer = inputRef.current?.getValue() || ""
              const isCorrect = submitAnswer(answer)
              setTimeout(() => {
                setResult(isCorrect ? "correct" : "incorrect")
                if (resultTimeout) clearTimeout(resultTimeout)
                setResultTimeout(
                  setTimeout(
                    () => setResult(""),
                    resultDelayTime + resultDisplayTime + 100,
                  ),
                )
                inputRef.current?.reset()
              }, 50)
            } else inputRef.current?.handleEvent(event)
          }}
        />
      </FullFlexColCenter>
    </FullFlexCol>
  )
}
