import { usePathname } from "expo-router";
import { Platform } from "react-native";

export default function useCanonicalLink() {
  const pathname = usePathname();

  if (Platform.OS !== "web") return "";

  const canonicalPath = pathname.split("?")[0].split("#")[0].replace(/\/$/, "");
  const canonicalLink = `${process.env.EXPO_PUBLIC_BASE_URL ?? ""}${canonicalPath}`;
  return canonicalLink;
}
