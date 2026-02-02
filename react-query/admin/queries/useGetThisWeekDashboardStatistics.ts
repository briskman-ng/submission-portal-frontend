import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Stats } from "@/types/admin/dashboard-statistics.type";

const getThisWeekDashboardStatistics = get<Stats>(
  adminSubmissionsApi,
  "/dashboard/week",
);

const useGetThisWeekDashboardStatistics = () => {
  return useQuery({
    queryFn: () => getThisWeekDashboardStatistics(),
    queryKey: [queryKeys.GET_THIS_WEEK_DASHBOARD_STATISTICS],
  });
};

export default useGetThisWeekDashboardStatistics;
