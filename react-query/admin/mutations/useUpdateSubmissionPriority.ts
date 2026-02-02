import { adminSubmissionsApi, put } from "@/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { toast } from "react-toastify";

interface IUpdateSubmissionPriority {
  priority: string;
  reason?: string;
}

const updateSubmissionPriority = put(adminSubmissionsApi, "/:id/priority");

const useUpdateSubmissionPriority = (
  submissionId: { id: string; trackingNumber: string },
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IUpdateSubmissionPriority) =>
      updateSubmissionPriority({ body, paramsMap: { id: submissionId.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.GET_SUBMISSION_DETAILS_BY_TRACKING_NUMBER,
          submissionId.trackingNumber,
        ],
      });

      toast.success("Priority updated!");

      onSuccess?.();
    },
  });
};

export default useUpdateSubmissionPriority;
