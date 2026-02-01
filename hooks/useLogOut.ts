import routes from "@/helpers/routes";
import { removeItem } from "@/lib/sessionStorage";
import useUserStore from "@/store/user-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogOut = () => {
  const { push } = useRouter();
  const { updateUser } = useUserStore((state) => state);

  const queryClient = useQueryClient();

  const logOut = () => {
    updateUser(null);
    removeItem("authToken");
    queryClient.resetQueries();

    push(routes.home());
  };

  return logOut;
};

export default useLogOut;
