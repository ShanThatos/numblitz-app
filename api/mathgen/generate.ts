import { useCallback } from "react";
import { MathProblem } from "../types";
import { useMathgenFetchJson } from "../utils";

interface GenerateModelResponse {
  problems: MathProblem[];
}

export const useGenerateModelProblems = () => {
  const mathgenFetchJson = useMathgenFetchJson();

  return useCallback(
    async (modelName: string, amount: number) =>
      (await mathgenFetchJson({
        path: `/generate/model/${modelName}`,
        params: { amount: amount.toString() },
        method: "GET",
      })) as GenerateModelResponse,
    [mathgenFetchJson],
  );
};
