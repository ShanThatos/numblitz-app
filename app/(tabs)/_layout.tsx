import React from "react";
import { useUser } from "~/components/contexts/session";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { Tabs } from "expo-router";
import { House, NotebookPen, UserRound } from "lucide-react-native";

const NAV_CONFIG = [
  {
    name: "index",
    title: "Home",
    IconComponent: House,
    requireAuth: false,
  },
  {
    name: "practice",
    title: "Practice",
    IconComponent: NotebookPen,
    requireAuth: false,
  },
  {
    name: "profile",
    title: "Profile",
    IconComponent: UserRound,
    requireAuth: true,
  },
];

export default function TabLayout() {
  const user = useUser();
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NAV_THEME[colorScheme].brandDark,
      }}
    >
      {NAV_CONFIG.map(({ name, title, IconComponent, requireAuth }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <IconComponent color={color} />,
            ...(requireAuth && !user ? { href: null } : {}),
          }}
        />
      ))}
    </Tabs>
  );
}
