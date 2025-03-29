import { useRef, useState } from "react";
import { useProfile } from "~/api/profile";
import { useUser } from "~/components/contexts/session";
import BackButton from "~/components/screens/components/BackButton";
import { ScreenContainer } from "~/components/screens/components/ScreenContainer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/clients";
import ChevronRight from "~/lib/icons/ChevronRight";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DateTime } from "luxon";
import { Pressable, View } from "react-native";

export default function AccountScreen() {
  const user = useUser();
  const { data: profile } = useProfile();
  const router = useRouter();

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const enableDeleteButtonTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDeleteAccount = () => {
    void (async () => {
      setDeleteButtonDisabled(true);
      await supabase.rpc("delete_user");
      await supabase.auth.signOut({ scope: "global" });
      router.replace("/");
      setDeleteButtonDisabled(false);
    })();
  };

  return (
    <ScreenContainer bounces={false}>
      <View className="pt-safe flex flex-1 flex-col">
        <View className="flex flex-row items-center gap-3 px-3 pt-2">
          <BackButton size={25} />
          <Text className="text-4xl font-bold leading-none">Account</Text>
        </View>
        <View className="flex flex-col items-center gap-1 pt-4">
          <Image
            className="aspect-square h-24 rounded-full border-4 border-slate-700"
            source={profile?.data?.avatar_url}
          />
          <View>
            <Text className="text-center text-xl leading-tight text-slate-700">
              {profile?.data?.full_name}
            </Text>
            <Text className="text-center leading-snug text-slate-700">
              Joined{" "}
              {user?.created_at
                ? `${DateTime.fromISO(user.created_at).toRelative() ?? ""} (${DateTime.fromISO(user.created_at).toLocaleString(DateTime.DATE_MED)})`
                : "..."}
            </Text>
          </View>
        </View>
        <View className="flex flex-1 flex-col items-stretch px-4 pt-4">
          <Dialog
            open={deleteAccountDialogOpen}
            onOpenChange={setDeleteAccountDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  {
                    "You're about to delete your account. \nYou will lose all your data. \n\nAre you sure you want to proceed?"
                  }
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Pressable
                  className="flex flex-row items-center justify-center rounded bg-red-600 p-2 active:opacity-80 disabled:opacity-50"
                  disabled={deleteButtonDisabled}
                  onPress={handleDeleteAccount}
                >
                  <Text className="text-white">Yes, delete my account</Text>
                </Pressable>
                <DialogClose asChild>
                  <Pressable className="flex flex-row items-center justify-center rounded bg-gray-500 p-2 active:opacity-80">
                    <Text className="text-white">Cancel</Text>
                  </Pressable>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Pressable
            className="flex flex-row items-center border-b-hairline border-b-slate-500 py-4 active:opacity-80"
            onPress={() => {
              setDeleteAccountDialogOpen(true);
              setDeleteButtonDisabled(true);
              if (enableDeleteButtonTimeout.current) {
                clearTimeout(enableDeleteButtonTimeout.current);
              }
              enableDeleteButtonTimeout.current = setTimeout(() => {
                setDeleteButtonDisabled(false);
              }, 5000);
            }}
          >
            <View className="px-3">
              <Text className="text-lg font-bold text-red-700">
                Delete Account
              </Text>
            </View>
            <ChevronRight className="ml-auto text-red-700" size={20} />
          </Pressable>
        </View>
        <View className="mt-auto flex flex-col p-5 pt-0">
          <Pressable
            className="rounded-full bg-brand-dark p-3 active:opacity-80"
            onPress={() => {
              void supabase.auth.signOut();
            }}
          >
            <Text className="text-center text-lg text-white">Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
