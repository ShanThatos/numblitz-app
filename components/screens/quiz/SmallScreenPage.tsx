import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import useGoBack from "~/hooks/use-go-back";
import { Image } from "expo-image";
import { Platform, View } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";

export default function SmallScreenPage() {
  const goBack = useGoBack();

  if (Platform.OS !== "web") {
    console.error("This component is only for web");
    return null;
  }

  return (
    <ScreenContainer bounces={false}>
      <View className="pt-safe pb-safe flex flex-1 flex-col items-center justify-center gap-3 p-3">
        <Text className="text-center text-lg font-bold leading-tight">
          This device is too small to display the quiz. Please use a larger
          screen, or download the app.
        </Text>
        <a
          href="https://apps.apple.com/us/app/numblitz/id6737863219"
          target="_blank"
        >
          <Image
            contentFit="contain"
            contentPosition="center"
            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
            source={require("assets/images/socials/appstore.png")}
            style={{
              height: 60,
              aspectRatio: 3,
            }}
          />
        </a>
        <View className="flex flex-row gap-2 border-t-hairline border-neutral-400 p-2">
          <Button className="flex-1 bg-sky-600" onPress={goBack}>
            <Text>Go Back</Text>
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
