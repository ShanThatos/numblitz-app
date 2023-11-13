import { useRef } from "react"

import QuizAnswerInput, { QuizAnswerInputHandle } from "./QuizAnswerInput"
import QuizKeyboard from "./QuizKeyboard"
import { ProblemModel } from "../../hooks/requests/models"
import {
  FlexRowCenter,
  FullFlexCol,
  FullFlexColCenter,
  KatexText,
  View,
} from "../base"
import MathView from "../math/MathView"

export interface QuizScreenProps {
  submitAnswer: (answer: string) => void
  model: ProblemModel
  question: string
  answer: string
}

export default function QuizScreen(props: QuizScreenProps) {
  const inputRef = useRef<QuizAnswerInputHandle>(null)

  return (
    <FullFlexCol className="bg-primary p-5" style={{ gap: 20 }}>
      <MathView
        className="h-24 max-w-full"
        contents={props.question}
        options={{ center: true, fontSize: "1.5em" }}
      />
      <FlexRowCenter>
        <QuizAnswerInput quizScreenProps={props} ref={inputRef} />
        {props.model.units && (
          <View className="w-0 overflow-visible">
            <KatexText className="w-40 pl-2 text-3xl">
              {props.model.units}
            </KatexText>
          </View>
        )}
      </FlexRowCenter>
      <FullFlexColCenter>
        <QuizKeyboard
          quizScreenProps={props}
          onEvent={(event) => {
            inputRef.current?.handleEvent(event)
          }}
        />
      </FullFlexColCenter>
    </FullFlexCol>
  )
}
