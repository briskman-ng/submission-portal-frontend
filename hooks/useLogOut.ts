import routes from "@/helpers/routes";
import { removeItem } from "@/lib/sessionStorage";
import useAdminUserStore from "@/store/admin/admin-user-store";
import useUserStore from "@/store/user-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogOut = () => {
  const { push } = useRouter();
  const { updateUser } = useUserStore((state) => state);
  const { updateUser: updateAdminUser } = useAdminUserStore((state) => state);

  const queryClient = useQueryClient();

  const logOut = () => {
    updateUser(null);
    updateAdminUser(null);
    removeItem("authToken");
    queryClient.resetQueries();

    push(routes.home());
  };

  return logOut;
};

export default useLogOut;
