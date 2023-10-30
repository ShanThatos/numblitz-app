import { FullView } from "../../../components/base"
import MathView from "../../../components/math/MathView"
import { getColor } from "../../../contexts/theme"

export default function WorkbooksIndex() {
  return (
    <FullView className="p-5">
      <MathView
        html="Hi $5 \times \frac{3}{45}$"
        options={{
          color: getColor("icon-darker"),
        }}
      />
    </FullView>
  )
}
