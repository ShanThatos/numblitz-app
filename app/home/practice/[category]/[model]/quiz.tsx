import { useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"

import {
  FlexRowCenter,
  FullFlexColCenter,
  FullView,
  Header3,
  Header4,
  Header5,
  Pressable,
} from "../../../../../components/base"
import QuizScreen from "../../../../../components/quiz/QuizScreen"
import { useModel } from "../../../../../hooks/requests/models"
import { authFetchGet } from "../../../../../utils/Query"

export interface MathProblem {
  question: string
  answer: string
}

const useModelQuiz = (modelId: string) => {
  const { model, refreshModel } = useModel(modelId)

  const [problems, setProblems] = useState<MathProblem[]>([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  const getProblems = useCallback(
    async () =>
      (await authFetchGet(`/mathgen/model/${modelId}/problems`, {
        params: { count: "5" },
      })) as MathProblem[],
    [],
  )

  const refreshQuiz = useCallback(async () => {
    setProblems(await getProblems())
    setCurrent(0)
  }, [])

  const updateProblems = useCallback(async () => {
    if (current < problems.length - 3) return
    const newProblems = await getProblems()
    setProblems((prev) => [...prev, ...newProblems])
  }, [])

  const startQuiz = useCallback(() => {}, [])

  return {
    model,
    refreshModel,
    problems,
    current,
    score,
    setScore,
    refreshQuiz,
    updateProblems,
    startQuiz,
  }
}

export default function ModelQuizScreen() {
  const { model: modelId } = useLocalSearchParams<{
    model: string
  }>()

  const { model, problems, current, refreshQuiz, startQuiz } = useModelQuiz(
    modelId || "",
  )
  const [started, setStarted] = useState(false)

  useFocusEffect(
    useCallback(() => {
      refreshQuiz()
    }, []),
  )

  if (!model || current >= problems.length)
    return <FullView className="bg-primary" />

  if (!started) {
    return (
      <FullFlexColCenter className="bg-primary">
        <Header3>{model.name}</Header3>
        <Header4>Practice Quiz</Header4>
        <FlexRowCenter className="mt-5">
          <Pressable
            className="rounded-lg bg-icon-darker p-2 px-5"
            onPress={() => {
              startQuiz()
              setStarted(true)
            }}
          >
            <Header5 className="text-center text-white">Start!</Header5>
          </Pressable>
        </FlexRowCenter>
      </FullFlexColCenter>
    )
  }

  return (
    <QuizScreen
      submitAnswer={() => {}}
      model={model}
      question={problems[current].question}
      answer={problems[current].answer}
    />
  )
}
