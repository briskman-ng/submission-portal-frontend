import { adminSubmissionsApi, getAll } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Submissions } from "@/types/admin/submissions.type";

const getAllSubmissions = getAll<{ submissions: Submissions[] }>(
  adminSubmissionsApi,
  "",
);

const useGetAllSubmissions = (filters?: { page?: number; status?: string }) => {
  return useQuery({
    queryFn: () => getAllSubmissions(filters),
    queryKey: [queryKeys.GET_ALL_SUBMISSIONS, filters],
  });
};

export default useGetAllSubmissions;
