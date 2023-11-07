import HtmlViewProps from "./HtmlViewProps"
import { View } from "../base"

export default function MathView({ html, className = "" }: HtmlViewProps) {
  return (
    <View className={`pointer-events-none flex-1 bg-transparent ${className}`}>
      <iframe
        srcDoc={html}
        style={{
          border: "0",
          flex: 1,
          overflow: "hidden",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </View>
  )
}
