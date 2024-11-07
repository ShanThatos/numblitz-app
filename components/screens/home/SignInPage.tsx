import ProgressArc from "~/components/graphics/ProgressArc";
import { Text } from "~/components/ui/text";
import { View } from "react-native";
import AppleSignInButton from "./components/AppleSignInButton";
import GoogleSignInButton from "./components/GoogleSignInButton";

export default function SignInPage() {
  return (
    <View className="flex-1 flex-col">
      <View className="flex flex-row items-center justify-evenly gap-5">
        <ProgressArc
          className="flex aspect-square h-28 flex-col items-center justify-center"
          progress={0}
          arcOptions={{
            strokeWidth: 8,
          }}
        >
          <Text className="text-3xl">0%</Text>
          <Text className="leading-none text-[#0009]">Complete</Text>
        </ProgressArc>
        <ProgressArc
          className="flex aspect-square h-28 flex-col items-center justify-center"
          progress={0}
          arcOptions={{
            strokeWidth: 8,
            stroke: "#12a8ff",
          }}
        >
          <Text className="text-3xl">0%</Text>
          <Text className="text-center leading-none text-[#0009]">Average</Text>
          <View className="relative h-0 w-full">
            <Text className="absolute inset-0 w-full text-center leading-none text-[#0009]">
              Score
            </Text>
          </View>
        </ProgressArc>
      </View>

      <View className="flex-1 flex-col items-center gap-5 pt-10">
        <View>
          <Text className="text-center text-xl font-bold">
            Want to track your progress?
          </Text>
          <Text className="text-center text-lg">
            Sign in for an awesome experience!
          </Text>
        </View>
        <View className="flex flex-col gap-3">
          <GoogleSignInButton />
          <AppleSignInButton />
        </View>
      </View>
    </View>
  );
}
