import { useMutation } from "@tanstack/react-query";
import { api, get } from "..";
import queryKeys from "../queryKeys";
import { Submission } from "@/types/submission.type";

const getSubmissionByTrackingNumber = get<Submission>(
  api,
  "/submissions/tracking/:trackingNumber",
);

const useGetSubmissionByTrackingNumber = (trackingNumber: string) => {
  return useMutation({
    mutationFn: (trackingNumber: string) =>
      getSubmissionByTrackingNumber({ paramsMap: { trackingNumber } }),
    mutationKey: [queryKeys.GET_SUBMISSION_BY_TRACKING_NUMBER],
  });
};

export default useGetSubmissionByTrackingNumber;
