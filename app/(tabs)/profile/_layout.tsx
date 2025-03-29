import { useSession } from "~/components/contexts/session";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Redirect, Stack } from "expo-router";

export default function ProfileLayout() {
  const session = useSession();
  const { colorScheme } = useColorScheme();

  if (!session.loading && !session.session?.user) {
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
