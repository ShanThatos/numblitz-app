import { useCallback, useRef } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { supabase } from "~/lib/clients";
import { useFocusEffect } from "expo-router";

export const useQueryFocusRefetch = <T>(options: UseQueryOptions<T>) => {
  const firstRender = useRef(true);

  // options.queryFn = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   return await options.queryFn();
  // };
  const result = useQuery(options);
  const { refetch } = result;

  useFocusEffect(
    useCallback(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }

      void refetch();
    }, [refetch]),
  );

  return result;
};

interface MathgenFetchOptions extends RequestInit {
  path?: string;
  params?: Record<string, string>;
}

export const useMathgenFetchJson = () => {
  const { data: serverUrlData, refetch: refetchServerUrl } = useQuery({
    queryKey: ["mathgen-api-url"],
    queryFn: async () =>
      await supabase.rpc("get_numblitz_server").throwOnError(),
  });

  return useCallback(
    async (options: MathgenFetchOptions) => {
      let urlData = serverUrlData;
      if (!serverUrlData?.data) {
        urlData = (await refetchServerUrl()).data;
      }
      const apiUrl = process.env.EXPO_PUBLIC_MATHGEN_API_URL ?? urlData?.data;
      if (!apiUrl) {
        throw new Error("No API URL found");
      }

      const { path, params, ...rest } = options;
      const baseUrl = new URL(apiUrl);
      const basePath = baseUrl.pathname.endsWith("/")
        ? baseUrl.pathname.substring(0, baseUrl.pathname.length - 1)
        : baseUrl.pathname;
      const url = new URL(basePath + (path ?? ""), baseUrl.origin);

      if (params) {
        url.search = new URLSearchParams(params).toString();
      }
      console.log("fetching", url.toString());
      return (await fetch(url.toString(), rest).then((response) =>
        response.json(),
      )) as unknown;
    },
    [refetchServerUrl, serverUrlData],
  );
};
