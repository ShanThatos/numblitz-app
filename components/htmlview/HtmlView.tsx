import HtmlViewProps from "./HtmlViewProps"
import { View, WebView } from "../base"

export default function HtmlView({ html, className = "" }: HtmlViewProps) {
  return (
    <View className={`flex-1 ${className}`}>
      <WebView
        className="h-full w-full flex-1 bg-transparent"
        source={{ html }}
      />
    </View>
  )
}
