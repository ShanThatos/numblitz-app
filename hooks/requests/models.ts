import { useAuthFetchGet } from "../authfetch"

type AnswerFormat =
  | "auto"
  | "number"
  | "decimal"
  | "money"
  | "fraction"
  | "mixed"

export interface MathProblem {
  question: string
  answer: string
  format: AnswerFormat
  units: string
  rtl: boolean
}

export interface ProblemModel {
  id: string
  category_id: string
  name: string
  image_display: string
  difficulty: number
  unlocked: boolean
  answer_format: AnswerFormat
  rtl: boolean
  units: string
}

interface ModelsParams {
  category_id?: string
  model_ids?: string
}

export const useModels = (params: ModelsParams) => {
  const {
    loading: loadingModels,
    data: models,
    refresh: refreshModels,
  } = useAuthFetchGet<ProblemModel[]>("/mathgen/models", {
    params: { ...params },
  })

  return { loadingModels, models, refreshModels }
}

export const useModel = (modelId: string | undefined) => {
  const {
    loading: loadingModel,
    data: models,
    refresh: refreshModel,
  } = useAuthFetchGet<ProblemModel[]>("/mathgen/models", {
    params: { model_ids: modelId || "" },
  })

  const model = models && models[0]
  return { loadingModel, model, refreshModel }
}

export const useExplanation = (modelId: string | undefined) => {
  const {
    loading: loadingExplanation,
    data: explanation,
    refresh: refreshExplanation,
  } = useAuthFetchGet<string>(`/mathgen/model/${modelId}/explanation`)

  return { loadingExplanation, explanation, refreshExplanation }
}
