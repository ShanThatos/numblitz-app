import { House, NotebookPen, UserRound } from "lucide-react-native";

export const NAV_CONFIG = [
  {
    name: "index",
    href: "/",
    title: "Home",
    IconComponent: House,
    requireAuth: false,
  },
  {
    name: "practice",
    href: "/practice/",
    title: "Practice",
    IconComponent: NotebookPen,
    requireAuth: false,
  },
  {
    name: "profile",
    href: "/profile/",
    title: "Profile",
    IconComponent: UserRound,
    requireAuth: true,
  },
] as const;
