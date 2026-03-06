import { useQuery } from "@tanstack/react-query";
import { adminSubmissionsApi, getAll } from "../..";
import queryKeys from "../queryKeys";
import { SubmissionResponses } from "@/types/admin/submission.type";

const getSubmissionResponses = getAll<{ responses: SubmissionResponses[] }>(
  adminSubmissionsApi,
  "/:id/responses",
);

export default function useGetSubmissionResponses(submissionId: string) {
  return useQuery({
    queryFn: () => getSubmissionResponses({}, { id: submissionId }),
    queryKey: [queryKeys.GET_SUBMISSION_RESPONSES, submissionId],
    enabled: !!submissionId,
  });
}
