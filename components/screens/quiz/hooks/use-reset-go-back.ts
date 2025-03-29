import useGoBack from "~/hooks/use-go-back";
import { useNavigation } from "expo-router";

export default function useResetTabBarGoBack() {
  const navigation = useNavigation();
  const goBack = useGoBack();
  return () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "flex" },
    });
    setTimeout(goBack, 0);
  };
}
