import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Stack } from "expo-router";

export default function PracticeLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: NAV_THEME[colorScheme].brandBackground,
        },
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[category]/index" />
      <Stack.Screen name="[category]/[model]/index" />
      <Stack.Screen
        name="[category]/[model]/quiz"
        options={{ gestureEnabled: false }}
      />
    </Stack>
  );
}
