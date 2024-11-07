import "~/global.css";
import "~/lib/interops";

import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "~/components/contexts/session";
import { queryClient } from "~/lib/clients";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppState, Platform } from "react-native";

import type { AppStateStatus } from "react-native";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
void SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isDarkColorScheme) {
      setColorScheme("light");
      void AsyncStorage.setItem("theme", "light");
    }
  }, [isDarkColorScheme, setColorScheme]);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    void (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        void AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      void SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Slot />
            {/* for modals: */}
            {/* <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack> */}
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
      <PortalHost />
    </>
  );
}
