import { useNavigation } from "expo-router";

export const useResetTabBarGoBack = () => {
  const navigation = useNavigation();
  return () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "flex" },
    });
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };
};
