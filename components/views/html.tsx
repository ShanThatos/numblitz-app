import { useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

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

  return (
    <View style={{ height }}>
      <WebView
        injectedJavaScriptBeforeContentLoaded={`
          window.onerror = function(message, sourcefile, lineno, colno, error) {
            alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
            return true;
          };
          true;
        `}
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage("width:" + document.body.scrollWidth);
          window.ReactNativeWebView.postMessage("height:" + document.body.scrollHeight);
          for (const time of [0, 100, 500]) {
            setTimeout(function() {
              window.ReactNativeWebView.postMessage("height:" + document.body.scrollHeight);
              window.ReactNativeWebView.postMessage("width:" + document.body.scrollWidth);
            }, time);
          }
          true;
        `}
        style={{
          width: "100%",
          height,
          backgroundColor: "transparent",
        }}
        source={{ html: source }}
        bounces={false}
        scrollEnabled={false}
        pointerEvents="none"
        onMessage={(event) => {
          const [type, value] = event.nativeEvent.data.split(":");
          if (type === "width") setWidth(parseInt(value, 10));
          if (type === "height") setHeight(parseInt(value, 10));
        }}
      />
    </View>
  );
};
