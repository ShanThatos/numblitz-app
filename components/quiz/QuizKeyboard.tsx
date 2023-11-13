import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Platform } from "react-native"

import { QuizScreenProps } from "./QuizScreen"
import { FlexCol, FullFlexRow, FullView, KatexText, Pressable } from "../base"

export interface QuizEvent {
  type:
    | "sign"
    | "number"
    | "decimal"
    | "submit"
    | "delete"
    | "clear"
    | "next"
    | "cursor-start"
    | "cursor-end"
  value?: string
}

interface QuizKeyboardKeyProps {
  classname?: string
  type?: QuizEvent["type"]
  value?: string
  quizScreenProps?: QuizScreenProps
  onPress?: (event: QuizEvent) => void
}

const QuizKeyboardKey = ({
  classname,
  type = "number",
  value,
  quizScreenProps,
  onPress,
}: QuizKeyboardKeyProps) => {
  const [disabled, setDisabled] = useState(false)

  return (
    <FullView className="p-1">
      <Pressable
        className="flex flex-1 items-center justify-center overflow-visible rounded-xl border-2 border-icon bg-white p-0.5 shadow-sm shadow-red-200 hover:shadow-lg active:bg-neutral-300"
        onPress={() => {
          if (disabled) return
          try {
            setDisabled(true)
            if (onPress) onPress({ type, value })
          } finally {
            setDisabled(false)
          }
        }}
      >
        {type === "delete" ? (
          <Entypo
            name="erase"
            size={24}
            color="black"
            style={{
              transform: [{ scaleX: quizScreenProps?.model.rtl ? -1 : 1 }],
            }}
          />
        ) : type === "cursor-start" ? (
          <MaterialCommunityIcons
            name="format-horizontal-align-left"
            size={30}
            color="black"
          />
        ) : type === "cursor-end" ? (
          <MaterialCommunityIcons
            name="format-horizontal-align-right"
            size={30}
            color="black"
          />
        ) : (
          <KatexText className={`text-3xl ${classname ?? ""}`}>
            {value || ""}
          </KatexText>
        )}
      </Pressable>
    </FullView>
  )
}

interface QuizKeyboardProps {
  quizScreenProps: QuizScreenProps
  onEvent?: (event: QuizEvent) => void
}

export default function QuizKeyboard({
  quizScreenProps,
  onEvent,
}: QuizKeyboardProps) {
  const QuizKey = (props: QuizKeyboardKeyProps) => (
    <QuizKeyboardKey {...props} onPress={onEvent} />
  )

  return (
    <FlexCol
      className={`mx-auto aspect-[.75] max-w-xs ${
        Platform.OS === "web" ? "w-full" : ""
      }`}
    >
      <FullFlexRow>
        <QuizKey type="clear" value="C" />
        <QuizKey
          type="sign"
          classname="font-bold pb-0.5 text-2xl"
          value="+/−"
        />
        <QuizKey type="delete" quizScreenProps={quizScreenProps} />
      </FullFlexRow>
      {[1, 4, 7].map((i) => (
        <FullFlexRow key={`digits-row-${i}`}>
          <QuizKey value={i.toString()} />
          <QuizKey value={(i + 1).toString()} />
          <QuizKey value={(i + 2).toString()} />
        </FullFlexRow>
      ))}
      <FullFlexRow>
        <QuizKey type="decimal" value="." />
        <QuizKey value="0" />
        <QuizKey type="next" value="⟳" />
      </FullFlexRow>
      <FullFlexRow>
        <QuizKey type="cursor-start" />
        <QuizKey type="cursor-end" />
      </FullFlexRow>
      <FullFlexRow className="pt-2">
        <QuizKey type="submit" value="Submit" />
      </FullFlexRow>
    </FlexCol>
  )
}
