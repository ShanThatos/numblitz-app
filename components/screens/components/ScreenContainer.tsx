import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import WebNavHeader from "./WebNavHeader";

export function ScreenContainer(props: ScrollViewProps) {
  return Platform.select({
    web: (
      <ScrollView
        className="min-h-full flex-1 bg-brand-background"
        contentContainerClassName="min-h-full"
        stickyHeaderIndices={[0]}
      >
        <WebNavHeader />
        {props.children}
      </ScrollView>
    ),
    default: (
      <KeyboardAvoidingView
        className="flex-1 bg-brand-background"
        behavior="padding"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-full"
          keyboardShouldPersistTaps="always"
          {...props}
        />
      </KeyboardAvoidingView>
    ),
  });
}
