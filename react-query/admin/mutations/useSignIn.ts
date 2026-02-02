import adminRoutes from "@/helpers/admin/routes";
import { setItem } from "@/lib/sessionStorage";
import { adminAuthApi, post } from "@/react-query";
import { AdminLoginResponse } from "@/types/admin/admin-login-response.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ISignInPayload {
  email: string;
  password: string;
}

const signIn = post<ISignInPayload, AdminLoginResponse>(
  adminAuthApi,
  "/login/password",
);

const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ISignInPayload) => signIn({ body }),
    onSuccess: (data) => {
      if (data.accessToken) {
        setItem("authToken", data.accessToken);
      }

      toast.success("Login successful");

      setTimeout(() => {
        router.push(adminRoutes.dashboard());
      }, 400);
    },
  });
};

export default useSignIn;
