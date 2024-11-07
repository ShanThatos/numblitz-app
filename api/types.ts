export interface MathProblem {
  name: string;
  question: string;
  choices?: string[];
  answer: string;
  format:
    | "number"
    | "decimal"
    | "money"
    | "fraction"
    | "mixed"
    | "multiplechoice";
  units: string;
  rtl: boolean;
}

export interface PracticeQuizScoreResult {
  score: number;
  correct: number;
  total: number;
  time: number;
  problems: MathProblem[];
  answers: string[];
}
