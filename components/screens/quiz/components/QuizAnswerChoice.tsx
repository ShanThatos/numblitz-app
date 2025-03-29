import { KatexWebView } from "~/components/views/katex";
import * as Haptics from "expo-haptics";
import { Platform, Pressable, View } from "react-native";
import { QuizInputEvent } from "./QuizInputEvent";

export interface QuizAnswerChoiceProps extends QuizInputEvent {
  choice?: string;
  onPress?: (event: QuizInputEvent) => void;
  selected?: boolean;
}

export default function QuizAnswerChoice({
  type,
  value,
  choice,
  onPress,
  selected,
}: QuizAnswerChoiceProps) {
  return (
    <Pressable
      className={`box-border min-h-14 rounded border-2 p-2 shadow-sm active:border-neutral-300 active:shadow-none ${selected ? "border-sky-600 bg-sky-100" : "border-transparent bg-white"} `}
      onPressIn={() => {
        if (["ios", "android"].includes(Platform.OS)) {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        }
        console.log({ type, value });
        onPress?.({ type, value });
      }}
    >
      <View className="pl-1">
        <KatexWebView
          source={`<b>${value ?? ""}</b>&nbsp; ${choice ?? ""}`}
          options={{
            align: "left",
            textAlign: "left",
            fontSize: "1.3em",
          }}
        />
      </View>
    </Pressable>
  );
}
