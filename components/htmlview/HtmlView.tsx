import { View } from "react-native"
import WebView from "react-native-webview"

import HtmlViewProps from "./HtmlViewProps"

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
