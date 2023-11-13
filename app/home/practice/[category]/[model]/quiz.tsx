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

  const [quizState, setQuizState] = useState<"ready" | "started" | "finished">(
    "ready",
  )
  const [problems, setProblems] = useState<MathProblem[]>([])
  const [current, setCurrent] = useState(0)
  const [submissions, setSubmissions] = useState<string[]>([])

  const getProblems = useCallback(
    async () =>
      (await authFetchGet(`/mathgen/model/${modelId}/problems`, {
        params: { count: "5" },
      })) as MathProblem[],
    [modelId],
  )

  const refreshQuiz = useCallback(async () => {
    setQuizState("ready")
    setCurrent(0)
    setSubmissions([])
    setProblems(await getProblems())
  }, [getProblems])

  const startQuiz = useCallback(() => {
    setQuizState("started")
  }, [])

  const updateProblems = useCallback(async () => {
    if (current < problems.length - 3) return
    const newProblems = await getProblems()
    setProblems((prev) => [...prev, ...newProblems])
  }, [problems, current, getProblems])

  const getScore = useCallback(() => {
    let score = 0
    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i] === problems[i].answer) score += 5
      else score = Math.max(score - 4, 0)
    }
    return score
  }, [submissions])

  const submitAnswer = useCallback(
    (answer: string) => {
      const isCorrect = answer === problems[current].answer
      setSubmissions((prev) => [...prev, answer])
      const score = getScore()
      if (score >= 50) setQuizState("finished")
      else {
        setCurrent((prev) => prev + 1)
        updateProblems()
      }
      return isCorrect
    },
    [problems, current, getScore, updateProblems],
  )

  return {
    model,
    refreshModel,
    state: quizState,
    problems,
    current,
    refreshQuiz,
    updateProblems,
    startQuiz,
    submitAnswer,
  }
}

export default function ModelQuizScreen() {
  const { model: modelId } = useLocalSearchParams<{
    model: string
  }>()

  const {
    model,
    state,
    problems,
    current,
    refreshQuiz,
    startQuiz,
    submitAnswer,
  } = useModelQuiz(modelId || "")

  useFocusEffect(
    useCallback(() => {
      refreshQuiz()
    }, []),
  )

  if (!model || current >= problems.length)
    return <FullView className="bg-primary" />

  if (state === "ready")
    return (
      <FullFlexColCenter className="bg-primary">
        <Header3>{model.name}</Header3>
        <Header4>Practice Quiz</Header4>
        <FlexRowCenter className="mt-5">
          <Pressable
            className="rounded-lg bg-icon-darker p-2 px-5"
            onPress={startQuiz}
          >
            <Header5 className="text-center text-white">Start!</Header5>
          </Pressable>
        </FlexRowCenter>
      </FullFlexColCenter>
    )
  else if (state === "started")
    return (
      <QuizScreen
        submitAnswer={submitAnswer}
        model={model}
        question={problems[current].question}
        answer={problems[current].answer}
      />
    )
  else if (state === "finished") return <></>
  return <></>
}
