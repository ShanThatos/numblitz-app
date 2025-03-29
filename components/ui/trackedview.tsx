import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { View, ViewProps } from "react-native";

interface TrackedViewProps extends ViewProps {
  setWidth?: (width: number) => void;
  setHeight?: (height: number) => void;
}

export const TrackedView = ({
  setWidth,
  setHeight,
  ...props
}: TrackedViewProps) => {
  const ref = useRef<View>(null);

  const measure = useCallback(() => {
    ref.current?.measure((_x, _y, width, height) => {
      setWidth?.(width);
      setHeight?.(height);
    });
  }, [setHeight, setWidth]);

  useLayoutEffect(measure);
  useFocusEffect(measure);

  return <View ref={ref} {...props} />;
};

export const useTrackedView = (defaults?: {
  width?: number;
  height?: number;
}) => {
  const [width, setWidth] = useState<number | undefined>(defaults?.width);
  const [height, setHeight] = useState<number | undefined>(defaults?.height);

  return { width, height, props: { setWidth, setHeight } };
};
