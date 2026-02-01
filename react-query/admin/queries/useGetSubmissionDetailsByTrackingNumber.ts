import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Submission } from "@/types/admin/submission.type";

const getSubmissionDetailsByTrackingNumber = get<Submission>(
  adminSubmissionsApi,
  "/tracking/:trackingNumber",
);

const useGetSubmissionDetailsByTrackingNumber = (trackingNumber: string) => {
  return useQuery({
    queryFn: () =>
      getSubmissionDetailsByTrackingNumber({ paramsMap: { trackingNumber } }),
    queryKey: [
      queryKeys.GET_SUBMISSION_DETAILS_BY_TRACKING_NUMBER,
      trackingNumber,
    ],
    retry: 1,
  });
};

export default useGetSubmissionDetailsByTrackingNumber;
