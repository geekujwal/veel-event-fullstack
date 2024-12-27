import { QueryKey, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

async function fetchData<T>(url: string): Promise<T> {
  const response = await axiosInstance.get("192.168.101.32/api/v1" + url);
  return response.data;
}

export function useFetchData<T>(queryKey: QueryKey, url: string) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => fetchData<T>(url),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
