import { adminAuthApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { getItem } from "@/lib/sessionStorage";
import { CurrentUser } from "@/types/admin/current-user.type";

const getCurrentUser = get<CurrentUser>(adminAuthApi, "/me");

const useGetCurrentUser = (enabled?: boolean) => {
  const authToken = getItem("authToken");

  return useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: [queryKeys.GET_CURRENT_USER],
    enabled: enabled && !!authToken,
    retry: 1,
  });
};

export default useGetCurrentUser;
