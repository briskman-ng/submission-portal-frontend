import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "..";
import queryKeys from "../queryKeys";
import { toast } from "react-toastify";
import routes from "@/helpers/routes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getItem } from "@/lib/sessionStorage";

interface ICreateSubmissionResponse {
  id: string;
  trackingNumber: string;
}

const useCreateSubmissionForGuest = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: FormData) => {
      const accessToken = getItem("authToken");

      return post<FormData, ICreateSubmissionResponse>(
        axios,
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )({ body });
    },
    onSuccess: (data) => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_MY_SUBMISSIONS],
      });

      toast.success("Submission sent!");

      setTimeout(() => {
        router.push(routes.trackSubmission() + `?id=${data.trackingNumber}`);
      }, 500);
    },
  });
};

export default useCreateSubmissionForGuest;
