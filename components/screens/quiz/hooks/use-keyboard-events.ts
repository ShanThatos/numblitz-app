import { useEffect } from "react";
import { Platform } from "react-native";
import { QuizInputEvent } from "../components/QuizInputEvent";

export default function useKeyboardEvents(
  handleEvent: (event: QuizInputEvent) => void,
) {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const handle = (quizEvent: QuizInputEvent) => {
        event.preventDefault();
        handleEvent(quizEvent);
      };

      if (event.key === "Enter") handle({ type: "submit" });
      else if ("0" <= event.key && event.key <= "9")
        handle({ type: "number", value: event.key });
      else if (event.key === "Backspace") handle({ type: "backspace" });
      else if (event.key === "Delete") handle({ type: "delete" });
      else if (event.key === "-") handle({ type: "sign" });
      else if (event.key === ".") handle({ type: "decimal" });
      else if (event.key === "c") handle({ type: "clear" });
      else if (event.key === "ArrowLeft") handle({ type: "cursor-left" });
      else if (event.key === "ArrowRight") handle({ type: "cursor-right" });
      else if (event.key === "Tab") handle({ type: "next" });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleEvent]);
}
