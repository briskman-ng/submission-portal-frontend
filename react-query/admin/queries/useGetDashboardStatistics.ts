import { adminSubmissionsApi, get } from "@/react-query";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { DashboardStatistics } from "@/types/admin/dashboard-statistics.type";

const getDashboardStatistics = get<DashboardStatistics>(
  adminSubmissionsApi,
  "/dashboard",
);

const useGetDashboardStatistics = () => {
  return useQuery({
    queryFn: () => getDashboardStatistics(),
    queryKey: [queryKeys.GET_DASHBOARD_STATISTICS],
  });
};

export default useGetDashboardStatistics;
