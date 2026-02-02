import { adminSubmissionsApi, put } from "@/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { toast } from "react-toastify";

interface IUpdateSubmissionStatus {
  status: string;
  reason?: string;
}

const updateSubmissionStatus = put(adminSubmissionsApi, "/:id/status");

const useUpdateSubmissionStatus = (
  submissionId: { id: string; trackingNumber: string },
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IUpdateSubmissionStatus) =>
      updateSubmissionStatus({ body, paramsMap: { id: submissionId.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.GET_SUBMISSION_DETAILS_BY_TRACKING_NUMBER,
          submissionId.trackingNumber,
        ],
      });

      toast.success("Status updated!");

      onSuccess?.();
    },
  });
};

export default useUpdateSubmissionStatus;
