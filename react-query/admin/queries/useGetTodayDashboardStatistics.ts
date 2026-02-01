import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { TodayDashboardStatistics } from "@/types/admin/today-dashboard-statistics.type";

const getTodayDashboardStatistics = get<TodayDashboardStatistics>(
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
