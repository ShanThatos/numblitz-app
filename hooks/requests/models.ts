import { useAuthFetchGet } from "../authfetch"

interface ProblemModel {
  id: string
  category_id: string
  name: string
  image_display: string
  difficulty: number
  locked: boolean
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

export const useModel = (model_id: string | undefined) => {
  const {
    loading: loadingModel,
    data: models,
    refresh: refreshModel,
  } = useAuthFetchGet<ProblemModel[]>("/mathgen/models", {
    params: { model_ids: model_id || "" },
  })

  const model = models && models[0]
  return { loadingModel, model, refreshModel }
}

export const useExplanation = (model_id: string | undefined) => {
  const {
    loading: loadingExplanation,
    data: explanation,
    refresh: refreshExplanation,
  } = useAuthFetchGet<string>(`/mathgen/model/${model_id}/explanation`)

  return { loadingExplanation, explanation, refreshExplanation }
}
