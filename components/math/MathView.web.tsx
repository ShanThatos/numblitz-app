import MathViewProps from "./MathViewProps"
import { katexify } from "./katexify"
import { View } from "../base"

export default function MathView({
  html,
  className = "",
  options = {},
}: MathViewProps) {
  return (
    <View className={`pointer-events-none flex-1 bg-transparent ${className}`}>
      <iframe
        srcDoc={katexify(html, options)}
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
