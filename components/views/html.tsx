import { useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

interface AutoHeightWebViewProps {
  source: string;
}

export const AutoHeightWebView = ({ source }: AutoHeightWebViewProps) => {
  const [, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

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
            }, time);
            setTimeout(function() {
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
