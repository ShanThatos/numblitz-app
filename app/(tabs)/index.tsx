import { useRef, useState } from "react";
import { useSession } from "~/components/contexts/session";
import PromiseRefreshControl from "~/components/screens/components/PromiseRefreshControl";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import DashboardPage from "~/components/screens/home/DashboardPage";
import SearchResultsPage from "~/components/screens/home/SearchResultsPage";
import SignInPage from "~/components/screens/home/SignInPage";
import { Text } from "~/components/ui/text";
import useBooleanState from "~/hooks/use-boolean-state";
import { queryClient } from "~/lib/clients";
import { Image } from "expo-image";
import { TextInput, View } from "react-native";

export default function HomeScreen() {
  const { session, loading } = useSession();

  const searchInputRef = useRef<TextInput>(null);
  const [searchInputFocused, setSearchInputFocused, setSearchInputBlurred] =
    useBooleanState();
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = () =>
    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });

  return (
    <ScreenContainer
      scrollEnabled={!searchInputFocused}
      refreshControl={<PromiseRefreshControl onRefresh={onRefresh} />}
    >
      <View className="pt-safe flex-1">
        <View className="flex-1 flex-col gap-5 px-5 py-3">
          <View className="flex flex-row items-center gap-2">
            <Image
              className="aspect-square h-10 web:hidden"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
              source={require("assets/images/icon-rounded.png")}
            />
            <Text className="native:pt-2 text-4xl font-bold leading-none">
              Dashboard
            </Text>
          </View>
          <TextInput
            ref={searchInputRef}
            className="rounded-lg border-2 border-neutral-200 bg-neutral-50 p-3 transition-colors focus:border-sky-300"
            placeholderTextColor={"#777"}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={setSearchInputFocused}
            onBlur={() => {
              setTimeout(setSearchInputBlurred, 300);
            }}
          />
          {searchInputFocused ? (
            <SearchResultsPage
              searchQuery={searchQuery}
              dismissSearch={() => {
                setSearchQuery("");
                setSearchInputBlurred();
                searchInputRef.current?.blur();
              }}
            />
          ) : loading ? (
            <></>
          ) : session?.user ? (
            <DashboardPage />
          ) : (
            <SignInPage />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}
