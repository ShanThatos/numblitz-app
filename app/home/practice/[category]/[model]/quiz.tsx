import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useMemo, useState } from "react"

import {
  FlexColCenter,
  FlexRowCenter,
  FullFlexColCenter,
  FullView,
  Header2,
  Header3,
  Header4,
  Header5,
  Pressable,
  Text,
  View,
} from "../../../../../components/base"
import QuizScreen from "../../../../../components/quiz/QuizScreen"
import { useModel } from "../../../../../hooks/requests/models"
import { authFetchGet, authFetchPost } from "../../../../../utils/Query"

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
  const [quizStartTime, setQuizStartTime] = useState(0)
  const [averageTime, setAverageTime] = useState(0)

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
    setQuizStartTime(Date.now())
  }, [])

  const updateProblems = useCallback(async () => {
    if (current < problems.length - 3) return
    const newProblems = await getProblems()
    setProblems((prev) => [...prev, ...newProblems])
  }, [problems, current, getProblems])

  const getScore = useCallback(
    (submissions: string[], problems: MathProblem[]) => {
      let score = 0
      for (let i = 0; i < submissions.length; i++) {
        if (submissions[i] === problems[i].answer) score += 5
        else score = Math.max(score - 4, 0)
      }
      return score
    },
    [],
  )

  const finishQuiz = useCallback(
    async (finalSubmissions: string[]) => {
      setQuizState("finished")
      const averageTime =
        (Date.now() - quizStartTime) / 1000 / finalSubmissions.length
      setAverageTime(averageTime)
      const { progress } = await authFetchGet(
        `/mathgen/modelprogress/${modelId}`,
      )
      authFetchPost(`/mathgen/modelprogress/${modelId}`, {
        params: {
          progress: progress + 1,
          average_time: averageTime.toFixed(1),
        },
      })
    },
    [quizStartTime, modelId],
  )

  const submitAnswer = useCallback(
    (answer: string) => {
      const isCorrect = answer === problems[current].answer
      const newSubmissions = [...submissions, answer]
      setSubmissions(newSubmissions)
      const score = getScore(newSubmissions, problems)
      if (score >= 50) finishQuiz(newSubmissions)
      else {
        setCurrent((prev) => prev + 1)
        updateProblems()
      }
      return isCorrect
    },
    [problems, submissions, current, getScore, updateProblems, finishQuiz],
  )

  const numCorrect = useMemo(() => {
    let numCorrect = 0
    for (let i = 0; i < submissions.length; i++)
      if (submissions[i] === problems[i].answer) numCorrect++
    return numCorrect
  }, [submissions, problems])

  const numIncorrect = useMemo(
    () => submissions.length - numCorrect,
    [submissions, numCorrect],
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
    numCorrect,
    numIncorrect,
    averageTime,
  }
}

export default function ModelQuizScreen() {
  const { category: categoryId, model: modelId } = useLocalSearchParams<{
    category: string
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
    numCorrect,
    numIncorrect,
    averageTime,
  } = useModelQuiz(modelId || "")

  useFocusEffect(
    useCallback(() => {
      refreshQuiz()
    }, []),
  )

  if (!model || current >= problems.length) return <FullView />

  if (state === "ready")
    return (
      <FullFlexColCenter>
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
  else if (state === "finished")
    return (
      <FullView>
        <FullFlexColCenter>
          <Header2 className="pb-8">Done!</Header2>
          <FlexRowCenter className="items-start" style={{ gap: 15 }}>
            <FlexColCenter>
              <FlexColCenter className="aspect-square w-16 rounded-full border-4 border-icon-darker">
                <Text className="text-lg font-bold">
                  {((numCorrect / (numCorrect + numIncorrect)) * 100).toFixed(
                    0,
                  )}
                  %
                </Text>
              </FlexColCenter>
              <Text className="text-lg font-bold">Accuracy</Text>
            </FlexColCenter>
            <FlexColCenter>
              <FlexColCenter className="aspect-square w-16 rounded-full border-4 border-icon-darker">
                <Text className="text-lg font-bold">
                  {averageTime.toFixed(1)}s
                </Text>
              </FlexColCenter>
              <Text className="text-center text-lg font-bold">Average</Text>
            </FlexColCenter>
          </FlexRowCenter>
        </FullFlexColCenter>
        <View className="px-4 pb-4">
          <Pressable
            className="rounded bg-icon p-2"
            onPress={() => {
              router.push(`/home/practice/${categoryId}/${modelId}`)
            }}
          >
            <Header5 className="text-center text-white">Continue</Header5>
          </Pressable>
        </View>
      </FullView>
    )
  return <></>
}
