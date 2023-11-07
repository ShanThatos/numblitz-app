import { KatexifyOptions } from "./katexify"

export default interface MathViewProps {
  html: string
  options?: KatexifyOptions
  className?: string
}
