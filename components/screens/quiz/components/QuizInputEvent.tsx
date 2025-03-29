export interface QuizInputEvent {
  type:
    | "sign"
    | "number"
    | "decimal"
    | "submit"
    | "exit"
    | "backspace"
    | "delete"
    | "clear"
    | "next"
    | "cursor-start"
    | "cursor-end"
    | "cursor-left"
    | "cursor-right"
    | "choice";
  value?: string;
}
