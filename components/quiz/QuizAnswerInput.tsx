import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import { Platform, View } from "react-native"

import { QuizEvent } from "./QuizKeyboard"
import { MathProblem, ProblemModel } from "../../hooks/requests/models"
import { FlexColCenter, FlexRow, FlexRowCenter, KatexText } from "../base"

const Cursor = ({
  overrideShow,
  right,
}: {
  overrideShow: boolean
  right: number
}) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const callback = setInterval(() => {
      setShow((prev) => !prev)
    }, 500)
    return () => clearInterval(callback)
  }, [])

  return (
    <View
      className="absolute flex h-full flex-col py-1"
      style={{ width: 2, right }}
    >
      <View
        className={`w-full flex-1 bg-black ${
          show || overrideShow ? "" : "opacity-0"
        }`}
      />
    </View>
  )
}

interface QuizTextInputProps {
  width: number
  sign?: boolean
  text?: string
  textSize?: string
  highlight?: boolean
  cursor?: boolean
  cursorPos?: number
}
const QuizTextInput = ({
  width,
  sign,
  text,
  textSize = "text-3xl",
  highlight,
  cursor,
  cursorPos,
}: QuizTextInputProps) => {
  const [overrideShowCursor, setOverrideShowCursor] = useState(false)
  useEffect(() => {
    if (cursor) {
      setOverrideShowCursor(true)
      setTimeout(() => {
        setOverrideShowCursor(false)
      }, 1000)
    }
  }, [text, cursorPos])

  const [textWidth, setTextWidth] = useState(0)

  return (
    <View
      className="rounded border-2 border-neutral-400 bg-neutral-100 p-2"
      style={{ width }}
    >
      <FlexRow className="items-center justify-end">
        <KatexText className={`${textSize} opacity-0`}>:</KatexText>
        {sign && <KatexText className={textSize}>-</KatexText>}
        <KatexText
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width)
          }}
          className={`${textSize} ${highlight ? "bg-[#30b3ff]" : ""}`}
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
        {cursor && cursorPos !== undefined && (
          <Cursor
            overrideShow={overrideShowCursor}
            right={
              text
                ? textWidth - textWidth * (cursorPos / (text?.length || 1)) - 1
                : 0
            }
          />
        )}
      </FlexRow>
    </View>
  )
}

export interface QuizAnswerInputHandle {
  reset: () => void
  getValue: () => string
  handleEvent: (event: QuizEvent) => void
}

interface QuizAnswerInputProps {
  model: ProblemModel
  problem: MathProblem
}

const QuizAnswerInput = forwardRef<QuizAnswerInputHandle, QuizAnswerInputProps>(
  function ({ problem }: QuizAnswerInputProps, ref) {
    const { format, answer, rtl } = problem

    const [negSign, setNegSign] = useState(false)
    const [texts, setTexts] = useState(["", "", ""])
    const [highlight, setHighlight] = useState(false)
    const [current, setCurrent] = useState(0)
    const [cursorPos, setCursorPos] = useState(0)

    const reset = useCallback(() => {
      setNegSign(false)
      setTexts(["", "", ""])
      setHighlight(false)
      setCurrent(0)
      setCursorPos(0)
    }, [])

    const getValue = useCallback(() => {
      if (format === "number" || format === "decimal" || format === "money")
        return `$${negSign ? "-" : ""}${texts[0]}$`
      else if (format === "fraction")
        return `$${negSign ? "-" : ""}\\frac{${texts[0]}}{${texts[1]}}$`
      else if (format === "mixed")
        return `$${negSign ? "-" : ""}${texts[0]}\\frac{${texts[1]}}{${
          texts[2]
        }}$`
      throw new Error("Invalid format")
    }, [format, negSign, texts])

    useImperativeHandle(ref, () => ({
      reset,
      getValue,
      handleEvent: (event) => {
        let showHighlight = false
        if (event.type === "clear") reset()
        else if (event.type === "delete") {
          setTexts((prev) => {
            const newPrev = [...prev]
            if (highlight) {
              newPrev[current] = ""
              setCursorPos(0)
            } else if (rtl)
              newPrev[current] =
                newPrev[current].slice(0, cursorPos) +
                newPrev[current].slice(cursorPos + 1)
            else {
              newPrev[current] =
                newPrev[current].slice(0, Math.max(cursorPos - 1, 0)) +
                newPrev[current].slice(cursorPos)
              setCursorPos(Math.max(cursorPos - 1, 0))
            }
            return newPrev
          })
        } else if (event.type === "sign") {
          setNegSign((prev) => !prev)
        } else if (event.type === "decimal" || event.type === "number") {
          setTexts((prev) => {
            const newPrev = [...prev]
            if (highlight) {
              newPrev[current] = event.value + ""
              setCursorPos(rtl ? 0 : 1)
            } else {
              newPrev[current] =
                newPrev[current].slice(0, cursorPos) +
                event.value +
                newPrev[current].slice(cursorPos)
              if (!rtl) setCursorPos((prev) => prev + 1)
            }
            return newPrev
          })
        } else if (event.type === "next") {
          setCurrent((prev) => {
            const next =
              (prev + 1) %
              (["number", "decimal", "money"].includes(format)
                ? 1
                : ["fraction"].includes(format)
                  ? 2
                  : 3)

            if (rtl) setCursorPos(0)
            else setCursorPos(texts[next].length)
            return next
          })
          showHighlight = true
        } else if (event.type === "cursor-start") setCursorPos(0)
        else if (event.type === "cursor-end")
          setCursorPos(texts[current].length)
        setHighlight(showHighlight)
      },
    }))

    if (format === "number" || format === "decimal" || format === "money") {
      return (
        <FlexColCenter>
          <QuizTextInput
            width={answer.length * 20}
            sign={negSign}
            text={texts[0]}
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
            cursorPos={cursorPos}
          />
        </FlexColCenter>
      )
    } else if (format === "fraction") {
      return (
        <FlexColCenter
          style={{
            gap: 5,
          }}
        >
          <QuizTextInput
            width={70}
            sign={negSign}
            text={texts[0]}
            textSize="text-2xl"
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
            cursorPos={cursorPos}
          />
          <View className="h-0.5 w-24 bg-black" />
          <QuizTextInput
            width={70}
            text={texts[1]}
            textSize="text-2xl"
            highlight={highlight && current === 1}
            cursor={!highlight && current === 1}
            cursorPos={cursorPos}
          />
        </FlexColCenter>
      )
    } else if (format === "mixed") {
      return (
        <FlexRowCenter style={{ gap: 10 }}>
          <QuizTextInput
            width={Math.max(answer.indexOf("\\frac"), 4) * 18}
            sign={negSign}
            text={texts[0]}
            textSize="text-2xl"
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
            cursorPos={cursorPos}
          />
          <FlexColCenter
            style={{
              gap: 5,
            }}
          >
            <QuizTextInput
              width={70}
              text={texts[1]}
              textSize="text-2xl"
              highlight={highlight && current === 1}
              cursor={!highlight && current === 1}
              cursorPos={cursorPos}
            />
            <View className="h-0.5 w-24 bg-black" />
            <QuizTextInput
              width={70}
              text={texts[2]}
              textSize="text-2xl"
              highlight={highlight && current === 2}
              cursor={!highlight && current === 2}
              cursorPos={cursorPos}
            />
          </FlexColCenter>
        </FlexRowCenter>
      )
    }

    return <></>
  },
)

export default QuizAnswerInput
