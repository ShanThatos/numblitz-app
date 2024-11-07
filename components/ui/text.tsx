import * as React from "react";
import { SlottableTextProps, TextRef } from "@rn-primitives/types";
import { cn } from "~/lib/utils";
import { cssInterop } from "nativewind";
import { Text as RNText, StyleSheet } from "react-native";

const CUSTOM_FONTS = ["Katex"];
const TextBase = React.forwardRef<TextRef, SlottableTextProps>(
  ({ style, ...props }, ref) => {
    const flatStyle = StyleSheet.flatten([style]);

    if (flatStyle.fontFamily && CUSTOM_FONTS.includes(flatStyle.fontFamily)) {
      const fontFamily = flatStyle.fontFamily;
      const fontWeight = flatStyle.fontWeight ?? "normal";
      const fontStyle = flatStyle.fontStyle ?? "normal";

      const isBold =
        fontWeight === "bold" ||
        (fontWeight !== "normal" && parseInt(fontWeight.toString(), 10) > 500);

      const isItalic = fontStyle === "italic";

      flatStyle.fontFamily =
        fontFamily + (isBold ? "_bold" : "") + (isItalic ? "_italic" : "");
    }

    return <RNText ref={ref} style={flatStyle} {...props} />;
  },
);
TextBase.displayName = "TextBase";

cssInterop(TextBase, {
  className: "style",
});

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    return (
      <TextBase
        className={cn(
          "text-base text-foreground web:select-text",
          textClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext };
