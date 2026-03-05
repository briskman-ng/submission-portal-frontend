import { useQuery } from "@tanstack/react-query";
import { adminSubmissionsApi, get } from "../..";
import queryKeys from "../queryKeys";
import { SubmissionDepartment } from "@/types/admin/departments.type";

const getSubmissionDepartments = get<SubmissionDepartment[]>(
  adminSubmissionsApi,
  "/departments",
);

export default function useGetSubmissionDepartments() {
  return useQuery({
    queryFn: () => getSubmissionDepartments(),
    queryKey: [queryKeys.GET_SUBMISSION_DEPARTMENTS],
  });
}
