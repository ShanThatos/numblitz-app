import MathViewProps from "./MathViewProps"
import { katexify } from "./katexify"
import { View, WebView } from "../base"

export default function MathView({
  html,
  className = "",
  options = {},
}: MathViewProps) {
  return (
    <View className={`flex-1 bg-transparent ${className}`}>
      <WebView
        className="h-full w-full flex-1 bg-transparent"
        source={{
          html: katexify(html, options),
        }}
      />
    </View>
  )
}
