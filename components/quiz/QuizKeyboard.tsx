import { Entypo } from "@expo/vector-icons"

import { QuizScreenProps } from "./QuizScreen"
import { FlexCol, FullFlexRow, FullView, KatexText, Pressable } from "../base"

export interface QuizEvent {
  type: "number" | "decimal" | "submit" | "delete" | "clear" | "next"
  value?: string
}

interface QuizKeyboardKeyProps {
  type?: QuizEvent["type"]
  value?: string
  quizScreenProps?: QuizScreenProps
  onPress?: (event: QuizEvent) => void
}

const QuizKeyboardKey = ({
  type = "number",
  value,
  quizScreenProps,
  onPress,
}: QuizKeyboardKeyProps) => {
  return (
    <FullView className="p-1">
      <Pressable
        className="flex flex-1 items-center justify-center overflow-visible rounded-xl border-2 border-icon bg-white p-2 shadow-sm shadow-red-200 hover:shadow-lg active:bg-neutral-300"
        onPress={() => {
          if (onPress) onPress({ type, value })
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
        ) : (
          <KatexText className="text-3xl">{value || ""}</KatexText>
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
    <FlexCol className="mx-auto aspect-[.8] w-80">
      <FullFlexRow>
        <QuizKey type="clear" value="C" />
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
        <QuizKey type="next" value="↻" />
      </FullFlexRow>
      <FullFlexRow className="pt-4">
        <QuizKey type="submit" value="Submit" />
      </FullFlexRow>
    </FlexCol>
  )
}
