import { ReactNode } from "react";
import { MathProblem } from "~/api/types";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import ChevronsLeft from "~/lib/icons/ChevronsLeft";
import ChevronsRight from "~/lib/icons/ChevronsRight";
import Delete from "~/lib/icons/Delete";
import RotateCw from "~/lib/icons/RotateCw";
import { View } from "react-native";
import QuizAnswerChoice from "./QuizAnswerChoice";
import { QuizInputEvent } from "./QuizInputEvent";
import QuizKeyboardKey, { QuizKeyboardKeyProps } from "./QuizKeyboardKey";

const KeyboardRow = ({ children }: { children?: ReactNode }) => {
  return (
    <View className="flex flex-row items-stretch justify-center gap-2">
      {children}
    </View>
  );
};

interface QuizKeyboardProps {
  problem: MathProblem;
  currentAnswerChoice?: string | null;
  onPress?: (event: QuizInputEvent) => void;
}

export default function QuizKeyboard({
  problem,
  currentAnswerChoice,
  onPress,
}: QuizKeyboardProps) {
  const KeyboardKey = (props: Omit<QuizKeyboardKeyProps, "onPress">) => (
    <QuizKeyboardKey {...props} onPress={onPress} />
  );

  return (
    <View className="pb-safe w-full border-t-hairline border-t-gray-400 bg-gray-300">
      <View className="flex flex-col gap-2 p-2">
        <View className="pb-2">
          <KeyboardRow>
            <Button
              size="lg"
              className="flex-1 border-none bg-red-700 shadow-sm"
              onPress={() => onPress?.({ type: "exit" })}
            >
              <Text>Exit</Text>
            </Button>
            <Button
              size="lg"
              className="flex-1 border-none bg-green-700 shadow-sm"
              onPress={() => onPress?.({ type: "submit" })}
            >
              <Text>Submit</Text>
            </Button>
          </KeyboardRow>
        </View>
        {problem.format === "multiplechoice" ? (
          problem.choices?.map((choice, index) => (
            <View key={`${choice}-${index.toString()}`}>
              <QuizAnswerChoice
                type="choice"
                choice={choice}
                value={"ABCDEFG".at(index)}
                onPress={onPress}
                selected={currentAnswerChoice === "ABCDEFG".at(index)}
              />
            </View>
          ))
        ) : (
          <>
            <KeyboardRow>
              <KeyboardKey type="clear" value="C" />
              <KeyboardKey
                type="sign"
                value="+/−"
                className="pb-0.5 font-bold"
              />
              <KeyboardKey type="backspace">
                <Delete className="text-black" size={30} />
              </KeyboardKey>
            </KeyboardRow>
            {[1, 4, 7].map((i) => (
              <KeyboardRow key={i.toString()}>
                <KeyboardKey type="number" value={i.toString()} />
                <KeyboardKey type="number" value={(i + 1).toString()} />
                <KeyboardKey type="number" value={(i + 2).toString()} />
              </KeyboardRow>
            ))}
            <KeyboardRow>
              <KeyboardKey
                type="decimal"
                value="."
                disabled={!["decimal", "money"].includes(problem.format)}
              />
              <KeyboardKey type="number" value="0" />
              <KeyboardKey type="next">
                <RotateCw className="text-black" size={30} />
              </KeyboardKey>
            </KeyboardRow>
            <KeyboardRow>
              <KeyboardKey type="cursor-start">
                <ChevronsLeft className="text-black" size={30} />
              </KeyboardKey>
              <KeyboardKey type="cursor-end">
                <ChevronsRight className="text-black" size={30} />
              </KeyboardKey>
            </KeyboardRow>
          </>
        )}
      </View>
    </View>
  );
}
