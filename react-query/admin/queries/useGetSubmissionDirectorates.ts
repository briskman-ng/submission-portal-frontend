import { useQuery } from "@tanstack/react-query";
import { adminSubmissionsApi, get } from "../..";
import queryKeys from "../queryKeys";
import { SubmissionDepartment } from "@/types/admin/departments.type";

const getSubmissionDirectorates = get<SubmissionDepartment[]>(
  adminSubmissionsApi,
  "/directorates",
);

export default function useGetSubmissionDirectorates() {
  return useQuery({
    queryFn: () => getSubmissionDirectorates(),
    queryKey: [queryKeys.GET_SUBMISSION_DIRECTORATES],
  });
}
