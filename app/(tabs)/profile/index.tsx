import { useProfile } from "~/api/profile";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import { Skeleton } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/text";
import ChevronRight from "~/lib/icons/ChevronRight";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

export default function ProfileScreen() {
  const { data: profile } = useProfile();

  return (
    <ScreenContainer bounces={false}>
      <View className="pt-safe flex-1 flex-col gap-5 px-4 pb-5 pt-3">
        <View>
          <View className="flex flex-row items-center gap-2.5 px-2 pb-4">
            {profile?.data?.avatar_url ? (
              <Image
                className="aspect-square h-20 rounded-full border-4 border-slate-700"
                source={profile.data.avatar_url}
              />
            ) : (
              <Skeleton className="aspect-square h-20 w-20 rounded-full border-4 border-slate-700 bg-slate-300" />
            )}
            <View>
              <Text className="text-2xl font-bold leading-tight text-slate-900">
                Welcome!
              </Text>
              <Text className="text-xl leading-tight text-slate-600">
                {profile?.data?.full_name}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-1 flex-col items-stretch">
          <Link href="/profile/history" asChild>
            <Pressable className="flex flex-row items-center border-b-hairline border-b-slate-500 py-4 active:opacity-80">
              <View className="px-3">
                <Text className="text-lg font-bold text-slate-700">
                  History
                </Text>
                <Text className="text-slate-600">
                  All your saved quizzes and scores
                </Text>
              </View>
              <ChevronRight className="ml-auto text-slate-600" size={20} />
            </Pressable>
          </Link>
          <Link href="/profile/account" asChild>
            <Pressable className="flex flex-row items-center py-4 active:opacity-80">
              <View className="px-3">
                <Text className="text-lg font-bold text-slate-700">
                  Account
                </Text>
                <Text className="text-slate-600">Logout, Delete account</Text>
              </View>
              <ChevronRight className="ml-auto text-slate-600" size={20} />
            </Pressable>
          </Link>
        </View>
      </View>
    </ScreenContainer>
  );
}
