import { useNavigation } from "expo-router";
import { Platform } from "react-native";

export default function useGoBack() {
  const navigation = useNavigation();

  return () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (Platform.OS === "web") {
      // let path = window.location.pathname;
      // if (path.endsWith("/")) path = path.slice(0, -1);
      // window.location.pathname = path.slice(0, path.lastIndexOf("/") + 1);
      const path = window.location.pathname;
      window.location.pathname = path.slice(0, path.lastIndexOf("/"));
    }
  };
}
