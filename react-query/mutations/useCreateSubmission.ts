import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, post } from "..";
import queryKeys from "../queryKeys";
import { toast } from "react-toastify";
import routes from "@/helpers/routes";
import { useRouter } from "next/navigation";

interface ICreateSubmissionResponse {
  id: string;
  trackingNumber: string;
}

const createSubmission = post<FormData, ICreateSubmissionResponse>(
  api,
  "/submissions",
);

const useCreateSubmission = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: FormData) => createSubmission({ body }),
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

export default useCreateSubmission;
