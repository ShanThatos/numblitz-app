import resolveConfig from "tailwindcss/resolveConfig"

import tailwindConfig from "../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)

const colors: any = fullConfig.theme?.colors ?? {}

export function getColor(color: string): string {
  if (color in colors) {
    const colorMap = colors[color]
    if (typeof colorMap === "string") return colorMap
    if (typeof colorMap === "object" && "DEFAULT" in colorMap) {
      return colorMap.DEFAULT
    }
  }

  const colorName = color.substring(0, color.lastIndexOf("-"))
  const colorNumber = color.substring(color.lastIndexOf("-") + 1)

  if (!(colorName in colors)) {
    throw new Error(`Color ${color} (${colorName}) not found in theme`)
  }
  const colorMap = colors[colorName]

  if (typeof colorMap === "string") return colorMap
  if (typeof colorMap === "object" && colorNumber in colorMap) {
    return colorMap[colorNumber]
  }

  throw new Error(
    `Color ${color} (${colorName}:${colorNumber}) not found in theme`,
  )
}

export default fullConfig.theme
