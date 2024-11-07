export interface QuizInputEvent {
  type:
    | "sign"
    | "number"
    | "decimal"
    | "submit"
    | "exit"
    | "delete"
    | "clear"
    | "next"
    | "cursor-start"
    | "cursor-end"
    | "choice";
  value?: string;
}
