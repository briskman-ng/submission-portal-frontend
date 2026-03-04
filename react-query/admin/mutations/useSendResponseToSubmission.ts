import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSubmissionsApi, post } from "../..";
import { toast } from "react-toastify";
import queryKeys from "../queryKeys";

interface SendResponseToSubmissionPayload {
  submissionId: string;
  responseType: string;
  deliveryMethod: string;
  subject: string;
  content: string;
  requiresAction: boolean;
}

const sendResponseToSubmission = post<SendResponseToSubmissionPayload>(
  adminSubmissionsApi,
  "/:id/responses",
);

export default function useSendResponseToSubmission(
  submissionId: string,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SendResponseToSubmissionPayload) =>
      sendResponseToSubmission({ body, params: { id: submissionId } }),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Response submitted");

      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SUBMISSION_RESPONSES, submissionId],
      });
    },
  });
}
