import { twMerge } from "tailwind-merge"

interface WithClassName {
  className?: string
}
export function styled<T>(
  Component: React.ComponentType<T & WithClassName>,
  className?: string,
) {
  return (props: T & WithClassName) => (
    <Component {...props} className={twMerge(className, props.className)} />
  )
}
