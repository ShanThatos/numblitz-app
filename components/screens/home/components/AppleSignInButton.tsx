import { useState } from "react";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/clients";
import { cn } from "~/lib/utils";
import * as AppleAuthentication from "expo-apple-authentication";
import { Image } from "expo-image";
import { CodedError } from "expo-modules-core";
import { Platform, Pressable } from "react-native";

export default function AppleSignInButton() {
  const [loading, setLoading] = useState(false);

  if (Platform.OS !== "ios") {
    return null;
  }

  const onPress = () => {
    void (async () => {
      setLoading(true);
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        if (credential.identityToken) {
          const {
            error,
            data: { user },
          } = await supabase.auth.signInWithIdToken({
            provider: "apple",
            token: credential.identityToken,
          });
          if (!error && user) {
            const userMetadata = user.user_metadata;
            if (!userMetadata.full_name && credential.fullName) {
              const fullName =
                `${credential.fullName.givenName ?? ""} ${credential.fullName.familyName ?? ""}`.trim();
              await supabase.auth.updateUser({
                data: {
                  ...userMetadata,
                  full_name: fullName,
                },
              });
              await supabase
                .from("profiles")
                .update({
                  full_name: fullName,
                  avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=256`,
                })
                .eq("id", user.id);
              await supabase.auth.refreshSession();
            }
          }
        } else {
          throw new Error("No identityToken.");
        }
      } catch (e) {
        if (e instanceof CodedError && e.code === "ERR_REQUEST_CANCELED") {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
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
        source={require("assets/images/socials/apple.png")}
      />
      <Text className="text-xl">Sign in with Apple</Text>
    </Pressable>
  );
}
