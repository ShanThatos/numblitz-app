import { FullView } from "../../../components/base"
import MathView from "../../../components/math/MathView"

export default function WorkbooksIndex() {
  return (
    <FullView className="p-5">
      <MathView contents="Hi $5 \times \frac{3}{45}$" />
    </FullView>
  )
}
