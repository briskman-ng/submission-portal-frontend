import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, get } from "..";
import queryKeys from "../queryKeys";
import { Submission } from "@/types/submission.type";

const getSubmissionByTrackingNumber = get<Submission>(
  api,
  "/submissions/tracking/:trackingNumber",
);

const useGetSubmissionByTrackingNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackingNumber: string) =>
      getSubmissionByTrackingNumber({ paramsMap: { trackingNumber } }),
    onSuccess: (data, trackingId) => {
      queryClient.setQueryData(
        [queryKeys.GET_SUBMISSION_BY_TRACKING_NUMBER, trackingId],
        data,
      );
    },
  });
};

export default useGetSubmissionByTrackingNumber;
