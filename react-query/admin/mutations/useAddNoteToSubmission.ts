import { adminSubmissionsApi, post } from "@/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { toast } from "react-toastify";

interface IAddNoteToSubmission {
  content: string;
}

const addNoteToSubmission = post(adminSubmissionsApi, "/:id/notes");

const useAddNoteToSubmission = (
  submissionId: { id: string; trackingNumber: string },
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IAddNoteToSubmission) =>
      addNoteToSubmission({ body, params: { id: submissionId.id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.GET_SUBMISSION_DETAILS_BY_TRACKING_NUMBER,
          submissionId.trackingNumber,
        ],
      });

      toast.success("Note added!");

      onSuccess?.();
    },
  });
};

export default useAddNoteToSubmission;
