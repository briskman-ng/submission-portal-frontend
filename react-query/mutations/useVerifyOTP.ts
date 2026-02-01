import { useMutation } from "@tanstack/react-query";
import { authApi, post } from "..";
import { toast } from "react-toastify";
import { VerifyOTPResponse } from "@/types/verify-otp-response.type";
import { setItem } from "@/lib/sessionStorage";

interface IVerifyOTPPayload {
  email: string;
  otp: string;
}

const verifyOTP = post<IVerifyOTPPayload, VerifyOTPResponse>(
  authApi,
  "/verify-otp",
);

const useVerifyOTP = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (body: IVerifyOTPPayload) => verifyOTP({ body }),
    onSuccess: (data) => {
      toast.success("OTP verified");

      onSuccess?.();

      if (data.accessToken) {
        setItem("authToken", data.accessToken);
      }
    },
  });
};

export default useVerifyOTP;
