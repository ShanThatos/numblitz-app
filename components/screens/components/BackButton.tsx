import useGoBack from "~/hooks/use-go-back";
import ChevronLeft from "~/lib/icons/ChevronLeft";
import { Pressable } from "react-native";

interface BackButtonProps {
  size?: number;
}

export default function BackButton({ size = 16 }: BackButtonProps) {
  const goBack = useGoBack();

  return (
    <Pressable onPress={goBack} className="scale-125">
      <ChevronLeft
        className="text-black"
        strokeWidth={3}
        width={size}
        height={size}
      />
    </Pressable>
  );
}
