import { useUser } from "~/components/contexts/session";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Redirect, Stack } from "expo-router";

export default function ProfileLayout() {
  const user = useUser();
  const { colorScheme } = useColorScheme();

  if (!user) {
    return <Redirect href={"/"} />;
  }

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
      <Stack.Screen name="account" />
    </Stack>
  );
}
