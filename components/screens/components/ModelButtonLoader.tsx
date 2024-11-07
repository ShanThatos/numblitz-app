import { Skeleton } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/text";
import { View } from "react-native";

export default function ModelButtonLoader() {
  return (
    <Skeleton className="rounded-md border border-input bg-white py-2">
      <Text> </Text>
      <View className="h-10" />
    </Skeleton>
  );
}
