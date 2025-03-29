import { useUser } from "~/components/contexts/session";
import { Text } from "~/components/ui/text";
import { TrackedView, useTrackedView } from "~/components/ui/trackedview";
import { NAV_CONFIG } from "~/lib/navconfig";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function WebNavHeader() {
  const user = useUser();
  const router = useRouter();

  const tracked = useTrackedView({ height: 50 });

  return (
    <View
      style={{
        height: tracked.height,
      }}
    >
      <TrackedView
        className="absolute top-0 w-screen border-b-2 border-neutral-200"
        {...tracked.props}
      >
        <nav className="flex flex-row bg-brand-background px-5 py-2">
          <div className="flex flex-row items-center gap-1">
            <Image
              className="aspect-square h-6"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
              source={require("assets/images/icon-rounded.png")}
            />
            <Text className="text-xl font-bold">NumBlitz</Text>
          </div>
          <div className="ml-auto flex flex-row items-center gap-2">
            {NAV_CONFIG.map(({ name, href, title, requireAuth }) =>
              requireAuth && !user ? null : (
                <Link key={name} href={href} push>
                  <Text className="font-semibold text-blue-700 hover:underline active:text-blue-900">
                    {title}
                  </Text>
                </Link>
                // <Link key={name} href={href} asChild>
                //   <Pressable
                //     onPress={() => {
                //       router.push(href);
                //     }}
                //   >
                //     <Text className="font-semibold text-blue-700 hover:underline active:text-blue-900">
                //       {title}
                //     </Text>
                //   </Pressable>
                // </Link>
                // <a key={name} href={href}>
                //   <Text className="font-semibold text-blue-700 hover:underline active:text-blue-900">
                //     {title}
                //   </Text>
                // </a>
              ),
            )}
          </div>
        </nav>
      </TrackedView>
    </View>
  );
}
