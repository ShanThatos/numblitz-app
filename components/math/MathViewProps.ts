import { KatexifyOptions } from "./katexify"

export default interface MathViewProps {
  contents: string
  options?: KatexifyOptions
  className?: string
}
