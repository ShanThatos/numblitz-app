import { ReactNode } from "react";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import * as Haptics from "expo-haptics";
import { Platform, Pressable } from "react-native";
import { QuizInputEvent } from "./QuizInputEvent";

export interface QuizKeyboardKeyProps extends QuizInputEvent {
  className?: string;
  children?: ReactNode;
  onPress?: (event: QuizInputEvent) => void;
  disabled?: boolean;
}

export default function QuizKeyboardKey({
  type,
  value,
  className,
  children,
  onPress,
  disabled,
}: QuizKeyboardKeyProps) {
  return (
    <Pressable
      className={`box-border flex h-16 flex-1 items-center justify-center rounded border border-transparent bg-white shadow-sm active:-translate-y-1/3 active:border-neutral-300 active:shadow-none ${disabled ? "opacity-30" : ""}`}
      onPressIn={() => {
        if (["ios", "android"].includes(Platform.OS)) {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        }
        onPress?.({ type, value });
      }}
      disabled={disabled}
    >
      {children ?? (
        <Text className={cn("font-Katex text-4xl", className)}>{value}</Text>
      )}
    </Pressable>
  );
}
