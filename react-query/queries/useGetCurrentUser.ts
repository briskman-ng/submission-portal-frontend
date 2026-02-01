import { useQuery } from "@tanstack/react-query";
import { authApi, get } from "..";
import { CurrentUser } from "@/types/current-user.type";
import queryKeys from "../queryKeys";
import { getItem } from "@/lib/sessionStorage";

const getCurrentUser = get<CurrentUser>(authApi, "/me");

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
