import React from "react";
import { useUser } from "~/components/contexts/session";
import { NAV_THEME } from "~/lib/constants";
import { NAV_CONFIG } from "~/lib/navconfig";
import { useColorScheme } from "~/lib/useColorScheme";
import { Tabs } from "expo-router";

export default function BaseLayout() {
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
