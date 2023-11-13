import { useAuthFetchGet } from "../authfetch"

export interface ProblemModel {
  id: string
  category_id: string
  name: string
  image_display: string
  difficulty: number
  unlocked: boolean
  answer_format: "auto" | "number" | "decimal" | "money" | "fraction" | "mixed"
  rtl: boolean
  units: string
}

interface ModelsParams {
  categoryId?: string
  modelIds?: string
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
    params: { modelIds: modelId || "" },
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
