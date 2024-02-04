import { View } from "react-native"

import MathViewProps from "./MathViewProps"
import { katexify } from "./katexify"

export default function MathView({
  contents,
  className = "",
  options = {},
}: MathViewProps) {
  return (
    <View className={`pointer-events-none bg-transparent ${className}`}>
      <iframe
        srcDoc={katexify(contents, options)}
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
