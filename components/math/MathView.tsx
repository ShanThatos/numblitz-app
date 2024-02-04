import { View } from "react-native"
import WebView from "react-native-webview"

import MathViewProps from "./MathViewProps"
import { katexify } from "./katexify"

export default function MathView({
  contents,
  className = "",
  options = {},
}: MathViewProps) {
  return (
    <View className={`bg-transparent ${className}`}>
      <WebView
        className="h-full w-full flex-1 bg-transparent"
        scrollEnabled={false}
        bounces={false}
        source={{
          html: katexify(contents, options),
        }}
      />
    </View>
  )
}
