import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

interface AutoHeightWebViewProps {
  source: string;
  defaultHeight?: number;
}

export const AutoHeightWebView = ({
  source,
  defaultHeight,
}: AutoHeightWebViewProps) => {
  const [, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>(defaultHeight);

  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const captureDimensions = () => {
      if (ref.current?.contentWindow?.document.body) {
        setWidth(ref.current.contentWindow.document.body.scrollWidth);
        setHeight(ref.current.contentWindow.document.body.scrollHeight + 20);
      }
    };

    setTimeout(captureDimensions, 0);
    setTimeout(captureDimensions, 100);

    const timeout = setInterval(captureDimensions, 500);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <View style={{ height }}>
      <iframe
        ref={ref}
        srcDoc={source}
        frameBorder="0"
        style={{
          width: "100%",
          height,
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      />
    </View>
  );
};
