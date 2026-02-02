import { useMutation } from "@tanstack/react-query";
import { authApi, post } from "..";
import { toast } from "react-toastify";

interface IRequestOTPPayload {
  email: string;
  name?: string;
}

const requestOTP = post<IRequestOTPPayload>(authApi, "/request-otp");

const useRequestOTP = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (body: IRequestOTPPayload) => requestOTP({ body }),
    onSuccess: () => {
      toast.success("OTP sent");

      onSuccess?.();
    },
  });
};

export default useRequestOTP;
