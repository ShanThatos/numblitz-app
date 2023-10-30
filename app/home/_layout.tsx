import { Tabs } from "expo-router"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Header6, Image, Pressable, View } from "../../components/base"
import { getColor } from "../../contexts/theme"

const tabBarIcons = {
  practice: {
    active: require("../../assets/images/tabbaricons/practice-active.png"),
    inactive: require("../../assets/images/tabbaricons/practice-inactive.png"),
  },
  workbooks: {
    active: require("../../assets/images/tabbaricons/workbooks-active.png"),
    inactive: require("../../assets/images/tabbaricons/workbooks-inactive.png"),
  },
  profile: {
    active: require("../../assets/images/tabbaricons/profile-active.png"),
    inactive: require("../../assets/images/tabbaricons/profile-inactive.png"),
  },
}

const TabBarIcon = ({
  focused,
  size,
  source,
}: {
  focused: boolean
  size: number
  source: keyof typeof tabBarIcons
}) => {
  return (
    <View className="">
      <Image
        source={tabBarIcons[source][focused ? "active" : "inactive"]}
        style={{ width: size, height: size }}
      />
    </View>
  )
}

export default function TabsLayout() {
  const { top: topInset } = useSafeAreaInsets()

  return (
    <Tabs
      initialRouteName="practice"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: getColor("primary"),
        },
        tabBarStyle: {
          backgroundColor: getColor("primary"),
          ...Platform.select({
            web: {
              marginBottom: 10,
            },
          }),
        },
        tabBarActiveTintColor: getColor("icon-darker"),
        tabBarInactiveTintColor: getColor("icon-inactive"),
        tabBarButton(props) {
          return <Pressable className="pt-3" {...props} />
        },
        tabBarLabel({ focused, color, position, children }) {
          return (
            <Header6 className="pt-1 font-[Mulish] text-sm" style={{ color }}>
              {children}
            </Header6>
          )
        },
        tabBarIconStyle: {
          aspectRatio: 1,
        },
      }}
      sceneContainerStyle={{
        marginTop: topInset,
        borderTopColor: getColor("neutral-200"),
        borderTopWidth: 1,
        backgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon({ focused, size }) {
            return (
              <TabBarIcon focused={focused} size={size} source="practice" />
            )
          },
        }}
      />
      <Tabs.Screen
        name="workbooks"
        options={{
          title: "Workbooks",
          tabBarIcon({ focused, size }) {
            return (
              <TabBarIcon focused={focused} size={size} source="workbooks" />
            )
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon({ focused, size }) {
            return <TabBarIcon focused={focused} size={size} source="profile" />
          },
        }}
      />
    </Tabs>
  )
}
