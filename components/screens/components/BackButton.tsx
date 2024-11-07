import ChevronLeft from "~/lib/icons/ChevronLeft";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";

interface BackButtonProps {
  size?: number;
}

export default function BackButton({ size = 16 }: BackButtonProps) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={navigation.goBack} className="scale-125">
      <ChevronLeft
        className="text-black"
        strokeWidth={3}
        width={size}
        height={size}
      />
    </Pressable>
  );
}
