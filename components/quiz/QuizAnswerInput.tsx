import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { Platform } from "react-native"

import { QuizEvent } from "./QuizKeyboard"
import { QuizScreenProps } from "./QuizScreen"
import { determineAnswerFormat } from "../../utils/quiz"
import { FlexColCenter, KatexText, View } from "../base"

const Cursor = ({ overrideShow }: { overrideShow: boolean }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const callback = setInterval(() => {
      setShow((prev) => !prev)
    }, 500)
    return () => clearInterval(callback)
  }, [])

  return (
    <View className={`w-0 ${show || overrideShow ? "" : "opacity-0"}`}>
      <KatexText className="w-0.5 bg-black text-xl"> </KatexText>
    </View>
  )
}

interface TextInputProps {
  width: number
  highlight?: boolean
  cursor?: boolean
  rtl?: boolean
  text?: string
}
const QuizTextInput = ({
  width,
  highlight,
  cursor,
  rtl,
  text,
}: TextInputProps) => {
  const [overrideShowCursor, setOverrideShowCursor] = useState(false)
  useEffect(() => {
    if (cursor) {
      setOverrideShowCursor(true)
      const callback = setTimeout(() => {
        setOverrideShowCursor(false)
      }, 500)
      return () => clearTimeout(callback)
    }
  }, [text])

  return (
    <View
      className="flex flex-row items-center justify-end rounded border-2 border-neutral-400 bg-neutral-100 p-2"
      style={{ width }}
    >
      <KatexText className="text-3xl opacity-0">:</KatexText>
      {cursor && rtl && <Cursor overrideShow={overrideShowCursor} />}
      <KatexText
        className={`pl-1 pr-0.5 text-3xl ${highlight ? "bg-[#30b3ff]" : ""}`}
        numberOfLines={1}
        ellipsizeMode="clip"
        // @ts-ignore
        style={Platform.select({
          web: {
            textOverflow: "clip",
          },
          native: {},
        })}
      >
        {text || " "}
      </KatexText>
      {cursor && !rtl && <Cursor overrideShow={overrideShowCursor} />}
    </View>
  )
}

export interface QuizAnswerInputHandle {
  handleEvent: (event: QuizEvent) => void
}

interface QuizAnswerInputProps {
  quizScreenProps: QuizScreenProps
}

const QuizAnswerInput = forwardRef<QuizAnswerInputHandle, QuizAnswerInputProps>(
  function ({ quizScreenProps }: QuizAnswerInputProps, ref) {
    const { model, answer } = quizScreenProps
    let format = model.answer_format
    if (format === "auto") format = determineAnswerFormat(answer)

    const [texts, setTexts] = useState(["", "", ""])
    const [highlight, setHighlight] = useState(false)
    const [current, setCurrent] = useState(0)

    useImperativeHandle(ref, () => ({
      handleEvent: (event) => {
        let showHighlight = false
        if (event.type === "clear") {
          setTexts(["", "", ""])
        } else if (event.type === "delete") {
          setTexts((prev) => {
            const newPrev = [...prev]
            if (highlight) newPrev[current] = ""
            else if (model.rtl) newPrev[current] = newPrev[current].slice(1)
            else newPrev[current] = newPrev[current].slice(0, -1)
            return newPrev
          })
        } else if (event.type === "decimal" || event.type === "number") {
          setTexts((prev) => {
            const newPrev = [...prev]
            if (highlight) newPrev[current] = event.value + ""
            else if (model.rtl)
              newPrev[current] = event.value + newPrev[current]
            else newPrev[current] += event.value
            return newPrev
          })
        } else if (event.type === "next") {
          setCurrent(
            (prev) =>
              (prev + 1) %
              (["number", "decimal", "money"].includes(format)
                ? 1
                : ["fraction"].includes(format)
                ? 2
                : 3),
          )
          showHighlight = true
        } else {
          return
        }
        setHighlight(showHighlight)
      },
    }))

    if (format === "number" || format === "decimal") {
      return (
        <FlexColCenter>
          <QuizTextInput
            width={answer.length * 20}
            rtl={model.rtl}
            text={texts[0]}
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
          />
        </FlexColCenter>
      )
    }

    return <></>
  },
)

export default QuizAnswerInput
