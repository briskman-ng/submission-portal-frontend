import { useMutation } from "@tanstack/react-query";
import { authApi, post } from "..";
import { toast } from "react-toastify";
import { VerifyOTPResponse } from "@/types/verify-otp-response.type";
import { setItem } from "@/lib/sessionStorage";
import useUserStore from "@/store/user-store";
import { CurrentUser } from "@/types/current-user.type";

interface IVerifyOTPPayload {
  email: string;
  otp: string;
}

const verifyOTP = post<IVerifyOTPPayload, VerifyOTPResponse>(
  authApi,
  "/verify-otp",
);

const useVerifyOTP = (onSuccess?: () => void) => {
  const updateUser = useUserStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (body: IVerifyOTPPayload) => verifyOTP({ body }),
    onSuccess: (data) => {
      toast.success("OTP verified");

      onSuccess?.();

      if (data.accessToken) {
        setItem("authToken", data.accessToken);
        updateUser(data.user as unknown as CurrentUser);
      }
    },
  });
};

export default useVerifyOTP;
