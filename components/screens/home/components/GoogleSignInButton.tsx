import { useEffect, useState } from "react";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/clients";
import { cn } from "~/lib/utils";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Pressable } from "react-native";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  });

  const onPress = () => {
    void (async () => {
      setLoading(true);
      try {
        const authUrl = (
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: "numblitz://google-auth",
            },
          })
        ).data.url;

        if (!authUrl) {
          throw new Error("Failed to get google auth URL");
        }

        const result = await WebBrowser.openAuthSessionAsync(
          authUrl,
          "numblitz://google-auth?",
          {
            showInRecents: true,
          },
        );

        if (result.type === "success") {
          const params = new URLSearchParams(result.url.split("#")[1]);
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (!accessToken || !refreshToken) {
            throw new Error("Failed to get tokens from auth URL");
          }
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            throw error;
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Pressable
      className={cn(
        "flex h-14 flex-row items-center justify-center gap-2 rounded bg-white px-5 py-3 shadow-sm active:bg-gray-50",
        loading && "opacity-70",
      )}
      disabled={loading}
      onPress={onPress}
    >
      <Image
        className="aspect-square h-8"
        /* eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment */
        source={require("assets/images/socials/google.png")}
      />
      <Text className="text-xl">Sign in with Google</Text>
    </Pressable>
  );
}
