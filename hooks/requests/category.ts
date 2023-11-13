import { useAuthFetchGet } from "../authfetch"

interface ProblemCategory {
  id: string
  name: string
  display: string
}

export const useCategory = (categoryId: string | undefined) => {
  const {
    loading: loadingCategory,
    data: category,
    refresh: refreshCategory,
  } = useAuthFetchGet<ProblemCategory>(`/mathgen/category/${categoryId}`)

  return { loadingCategory, category, refreshCategory }
}
