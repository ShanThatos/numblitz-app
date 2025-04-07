/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "~/global.css";
import "~/lib/interops";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "~/components/contexts/session";
import useCanonicalLink from "~/hooks/use-canonical-link";
import { queryClient } from "~/lib/clients";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";
import { AppState, Platform } from "react-native";

import type { AppStateStatus } from "react-native";

const fontsPatch = {
  regular: {
    fontFamily: "",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "",
    fontWeight: "normal",
  },
  bold: {
    fontFamily: "",
    fontWeight: "normal",
  },
  heavy: {
    fontFamily: "",
    fontWeight: "normal",
  },
} as const;

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: fontsPatch,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: fontsPatch,
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
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const canonicalLink = useCanonicalLink();

  useEffect(() => {
    if (isDarkColorScheme) {
      setColorScheme("light");
      void AsyncStorage.setItem("theme", "light");
    }
  }, [isDarkColorScheme, setColorScheme]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    void (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-brand-background");
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

  const [loaded, error] = useFonts({
    Katex: require("~/assets/fonts/katex/Katex.ttf"),
    Katex_bold: require("~/assets/fonts/katex/Katex_bold.ttf"),
    Katex_italic: require("~/assets/fonts/katex/Katex_italic.ttf"),
    Katex_bold_italic: require("~/assets/fonts/katex/Katex_bold_italic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (error) {
    console.error(error);
  }

  if (!isColorSchemeLoaded || !loaded) {
    return null;
  }

  return (
    <>
      {Platform.OS === "web" && (
        <Head>
          <title>NumBlitz | Number Sense Mental Math Tricks</title>
          <link rel="canonical" href={canonicalLink} />
        </Head>
      )}
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Slot />
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
      <PortalHost />
    </>
  );
}
