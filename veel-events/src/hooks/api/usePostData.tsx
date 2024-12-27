import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

async function postData<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  const response = await axiosInstance.post(
    "http://localhost:3000/api/v1" + url,
    data
  );
  return response.data;
}

export function usePostData<TRequest, TResponse>(url: string) {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: (data: TRequest) => postData<TRequest, TResponse>(url, data),
    onSuccess: (data) => {
      console.log("Data successfully posted", data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });
}
