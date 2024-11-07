import { ReactNode } from "react";
import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";

interface ArcOptions {
  start?: number;
  stroke?: string;
  backgroundStroke?: string;
  strokeWidth?: number;
}

interface ProgressArcProps {
  progress?: number;
  className?: string;
  arcOptions?: ArcOptions;
  children?: ReactNode;
}

export default function ProgressArc({
  progress,
  className,
  arcOptions,
  children,
}: ProgressArcProps) {
  const strokeWidth = arcOptions?.strokeWidth ?? 8;
  const R = Math.ceil((100 - strokeWidth) / 2);
  const angle = (progress ?? 0.3) * 360;
  const circumference = Math.PI * R * 2;
  const dashOffset = (circumference * (-(arcOptions?.start ?? 0) + 90)) / 360.0;
  const dashLength = circumference * (angle / 360.0);
  return (
    <View className={`${className ?? ""} relative`}>
      <Svg
        width={"100%"}
        height={"100%"}
        viewBox="0 0 100 100"
        style={{ position: "absolute" }}
      >
        <Circle
          r={R}
          cx={50}
          cy={50}
          fill="none"
          stroke={arcOptions?.backgroundStroke ?? "#0002"}
          strokeWidth={strokeWidth}
        />
        <Circle
          r={R}
          cx={50}
          cy={50}
          fill="none"
          stroke={arcOptions?.stroke ?? "#12a811"}
          strokeWidth={strokeWidth}
          strokeDashoffset={dashOffset}
          strokeDasharray={[dashLength, circumference - dashLength]}
          strokeLinecap="round"
        />
      </Svg>
      {children}
    </View>
  );
}
