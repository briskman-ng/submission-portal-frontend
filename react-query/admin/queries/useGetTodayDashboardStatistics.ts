import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Stats } from "@/types/admin/dashboard-statistics.type";

const getTodayDashboardStatistics = get<Stats>(
  adminSubmissionsApi,
  "/dashboard/today",
);

const useGetTodayDashboardStatistics = () => {
  return useQuery({
    queryFn: () => getTodayDashboardStatistics(),
    queryKey: [queryKeys.GET_TODAY_DASHBOARD_STATISTICS],
  });
};

export default useGetTodayDashboardStatistics;
