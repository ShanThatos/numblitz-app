import { useState } from "react";
import { RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PromiseRefreshControlProps {
  onRefresh: () => Promise<unknown>;
}

export default function PromiseRefreshControl({
  onRefresh,
}: PromiseRefreshControlProps) {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <RefreshControl
      progressViewOffset={insets.top}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        void onRefresh().then(() => {
          setRefreshing(false);
        });
      }}
    />
  );
}
