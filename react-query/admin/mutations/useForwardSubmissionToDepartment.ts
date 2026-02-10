import { adminSubmissionsApi, post } from "@/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import queryKeys from "../queryKeys";

interface IForwardSubmissionPayload {
  department: string;
  email: string;
  cc?: string;
  message?: string;
  includeAttachments?: boolean;
  attachmentIds?: string[];
}

const forwardSubmissionToDepartment = post<IForwardSubmissionPayload>(
  adminSubmissionsApi,
  "/:id/forward",
);

const useForwardSubmissionToDepartment = (
  submissionId: { id: string; trackingNumber: string },
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IForwardSubmissionPayload) =>
      forwardSubmissionToDepartment({ body, params: { id: submissionId.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.GET_SUBMISSION_DETAILS_BY_TRACKING_NUMBER,
          submissionId.trackingNumber,
        ],
      });

      toast.success("Submission forwarded!");

      onSuccess?.();
    },
  });
};

export default useForwardSubmissionToDepartment;
