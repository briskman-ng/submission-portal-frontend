import { useQuery } from "@tanstack/react-query";
import { api, getAll } from "..";
import queryKeys from "../queryKeys";
import { Submissions } from "@/types/submissions.type";

const getMySubmissions = getAll<{ submissions: Submissions[] }>(
  api,
  "/submissions/my-submissions",
);

const useGetMySubmissions = () => {
  return useQuery({
    queryFn: () => getMySubmissions(),
    queryKey: [queryKeys.GET_MY_SUBMISSIONS],
  });
};

export default useGetMySubmissions;
