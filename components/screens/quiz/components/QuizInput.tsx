import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { MathProblem } from "~/api/types";
import { Text } from "~/components/ui/text";
import { Platform, Pressable, View } from "react-native";
import { QuizInputEvent } from "./QuizInputEvent";

const Cursor = ({
  overrideShow,
  right,
}: {
  overrideShow: boolean;
  right: number;
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const callback = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => {
      clearInterval(callback);
    };
  }, []);

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
  );
};

interface QuizTextInputProps {
  width: number;
  sign?: boolean;
  text?: string;
  textSize?: string;
  highlight?: boolean;
  cursor?: boolean;
  cursorPos?: number;
  onPress?: () => void;
}
const QuizTextInput = ({
  width,
  sign,
  text,
  textSize = "text-3xl",
  highlight,
  cursor,
  cursorPos,
  onPress,
}: QuizTextInputProps) => {
  const [overrideShowCursor, setOverrideShowCursor] = useState(false);
  useEffect(() => {
    if (cursor) {
      setOverrideShowCursor(true);
      setTimeout(() => {
        setOverrideShowCursor(false);
      }, 1000);
    }
  }, [text, cursorPos, cursor]);

  const [textWidth, setTextWidth] = useState(0);

  return (
    <Pressable
      className="rounded border-2 border-neutral-400 bg-neutral-100 p-2"
      style={{ width }}
      onPress={onPress}
    >
      <View className="flex flex-row items-center justify-end overflow-hidden">
        <Text className={`${textSize} font-Katex opacity-0`}>:</Text>
        {sign && <Text className={`${textSize} mr-0.5 font-Katex`}>-</Text>}
        <Text
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width);
          }}
          className={`${textSize} overflow-visible ${highlight ? "bg-[#30b3ff] font-Katex" : "font-Katex"}`}
          numberOfLines={1}
          ellipsizeMode="clip"
          // @ts-expect-error textOverflow is web only
          style={Platform.select({
            web: {
              textOverflow: "clip",
            },
            default: {},
          })}
        >
          {text ?? " "}
        </Text>
        {cursor && cursorPos !== undefined && (
          <Cursor
            overrideShow={overrideShowCursor}
            right={
              text
                ? textWidth - textWidth * (cursorPos / (text.length || 1))
                : 0
            }
          />
        )}
      </View>
    </Pressable>
  );
};

export interface QuizAnswerInputHandle {
  reset: () => void;
  getValue: () => string;
  handleEvent: (event: QuizInputEvent) => void;
}

interface QuizAnswerInputProps {
  problem: MathProblem;
}

const QuizAnswerInput = forwardRef<QuizAnswerInputHandle, QuizAnswerInputProps>(
  function ({ problem }: QuizAnswerInputProps, ref) {
    const { format, answer } = problem;

    const [negSign, setNegSign] = useState(false);
    const [texts, setTexts] = useState(["", "", ""]);
    const [highlight, setHighlight] = useState(false);
    const [current, setCurrent] = useState(0);
    const [cursorPos, setCursorPos] = useState(0);

    const reset = useCallback(() => {
      setNegSign(false);
      setTexts(["", "", ""]);
      setHighlight(false);
      setCurrent(0);
      setCursorPos(0);
    }, []);

    const getValue = useCallback(() => {
      if (format === "number" || format === "decimal" || format === "money")
        return `$${negSign ? "-" : ""}${texts[0]}$`;
      else if (format === "fraction")
        return `$${negSign ? "-" : ""}\\frac{${texts[0]}}{${texts[1]}}$`;
      return `$${negSign ? "-" : ""}${texts[0]}\\frac{${texts[1]}}{${
        texts[2]
      }}$`;
    }, [format, negSign, texts]);

    const handleEvent = useCallback(
      (event: QuizInputEvent) => {
        setHighlight(false);
        if (event.type === "clear") reset();
        else if (event.type === "backspace") {
          setTexts((prev) => {
            const newPrev = [...prev];
            if (highlight) {
              newPrev[current] = "";
              setCursorPos(0);
            } else {
              newPrev[current] =
                newPrev[current].slice(0, Math.max(cursorPos - 1, 0)) +
                newPrev[current].slice(cursorPos);
              setCursorPos(Math.max(cursorPos - 1, 0));
            }
            return newPrev;
          });
        } else if (event.type === "delete") {
          setTexts((prev) => {
            const newPrev = [...prev];
            if (highlight) {
              newPrev[current] = "";
              setCursorPos(0);
            } else {
              newPrev[current] =
                newPrev[current].slice(0, cursorPos) +
                newPrev[current].slice(cursorPos + 1);
            }
            return newPrev;
          });
        } else if (event.type === "sign") {
          setNegSign((prev) => !prev);
        } else if (event.type === "decimal" || event.type === "number") {
          setTexts((prev) => {
            const newPrev = [...prev];
            if (highlight) {
              newPrev[current] = (event.value ?? "") + "";
              setCursorPos(1);
            } else {
              newPrev[current] =
                newPrev[current].slice(0, cursorPos) +
                (event.value ?? "") +
                newPrev[current].slice(cursorPos);
              setCursorPos((prev) => prev + 1);
            }
            return newPrev;
          });
        } else if (event.type === "next") {
          setCurrent((prev) => {
            const next =
              (prev + 1) %
              (["number", "decimal", "money"].includes(format)
                ? 1
                : ["fraction"].includes(format)
                  ? 2
                  : 3);
            if (texts[next].length !== 0) setHighlight(true);
            setCursorPos(texts[next].length);
            return next;
          });
        } else if (event.type === "cursor-start") setCursorPos(0);
        else if (event.type === "cursor-end")
          setCursorPos(texts[current].length);
        else if (event.type === "cursor-left")
          setCursorPos((prev) => Math.max(prev - 1, 0));
        else if (event.type === "cursor-right")
          setCursorPos((prev) => Math.min(prev + 1, texts[current].length));
      },
      [current, cursorPos, format, highlight, reset, texts],
    );

    const createMoveToInputHandler = useCallback(
      (nextInput: number) => {
        return () => {
          setCurrent(nextInput);
          if (texts[nextInput].length !== 0) setHighlight(true);
          setCursorPos(texts[nextInput].length);
        };
      },
      [texts],
    );

    useImperativeHandle(ref, () => ({
      reset,
      getValue,
      handleEvent,
    }));

    if (format === "number" || format === "decimal" || format === "money") {
      return (
        <View className="flex flex-col items-center justify-center">
          <QuizTextInput
            width={answer.length * 20}
            sign={negSign}
            text={texts[0]}
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
            cursorPos={cursorPos}
            onPress={createMoveToInputHandler(0)}
          />
        </View>
      );
    }

    if (format === "fraction") {
      return (
        <View
          className="flex flex-col items-center justify-center gap-1"
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
            onPress={createMoveToInputHandler(0)}
          />
          <View className="h-0.5 w-24 bg-black" />
          <QuizTextInput
            width={70}
            text={texts[1]}
            textSize="text-2xl"
            highlight={highlight && current === 1}
            cursor={!highlight && current === 1}
            cursorPos={cursorPos}
            onPress={createMoveToInputHandler(1)}
          />
        </View>
      );
    }

    if (format === "mixed") {
      return (
        <View className="flex flex-row items-center justify-center gap-3">
          <QuizTextInput
            width={Math.max(answer.indexOf("\\frac"), 4) * 18}
            sign={negSign}
            text={texts[0]}
            textSize="text-2xl"
            highlight={highlight && current === 0}
            cursor={!highlight && current === 0}
            cursorPos={cursorPos}
            onPress={createMoveToInputHandler(0)}
          />
          <View
            className="flex flex-col items-center justify-center"
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
              onPress={createMoveToInputHandler(1)}
            />
            <View className="h-0.5 w-24 bg-black" />
            <QuizTextInput
              width={70}
              text={texts[2]}
              textSize="text-2xl"
              highlight={highlight && current === 2}
              cursor={!highlight && current === 2}
              cursorPos={cursorPos}
              onPress={createMoveToInputHandler(2)}
            />
          </View>
        </View>
      );
    }

    throw new Error(`Invalid format ${format}`);
  },
);

QuizAnswerInput.displayName = "QuizAnswerInput";

export default QuizAnswerInput;
