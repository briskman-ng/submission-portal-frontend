import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { SubmissionStatusStats } from "@/types/admin/submission-status-stats.type";

const getSubmissionStatusStats = get<SubmissionStatusStats>(
  adminSubmissionsApi,
  "/stats/status",
);

const useGetSubmissionStatusStats = () => {
  return useQuery({
    queryFn: () => getSubmissionStatusStats(),
    queryKey: [queryKeys.GET_SUBMISSION_STATUS_STATS],
  });
};

export default useGetSubmissionStatusStats;
