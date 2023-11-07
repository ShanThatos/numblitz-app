import { useAuthFetchGet } from "../authfetch"

interface ProblemCategory {
  id: string
  name: string
  display: string
}

export const useCategory = (category_id: string | undefined) => {
  const {
    loading: loadingCategory,
    data: category,
    refresh: refreshCategory,
  } = useAuthFetchGet<ProblemCategory>(`/mathgen/category/${category_id}`)

  return { loadingCategory, category, refreshCategory }
}
