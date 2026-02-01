import { useQuery } from "@tanstack/react-query";
import { api, get } from "..";
import queryKeys from "../queryKeys";
import { SubmissionStats } from "@/types/submission-stats.type";

const getMySubmissionsStats = get<SubmissionStats>(
  api,
  "/submissions/my-submissions/stats",
);

const useGetMySubmissionStats = () => {
  return useQuery({
    queryFn: () => getMySubmissionsStats(),
    queryKey: [queryKeys.GET_MY_SUBMISSIONS_STATS],
  });
};

export default useGetMySubmissionStats;
