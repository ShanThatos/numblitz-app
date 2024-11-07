import { AppleAuthenticationButton } from "expo-apple-authentication";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";

cssInterop(Image, {
  className: "style",
});

cssInterop(AppleAuthenticationButton, {
  className: "style",
});
