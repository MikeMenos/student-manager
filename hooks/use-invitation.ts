import { errorToast, successToast } from "@/components/shared/toasts";
import { addTherapist } from "@/lib/api/invitation/api";
import { SessionType } from "@/types/attendance.type";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useInviteTherapist = (
  email: string,
  setUserEmail: Dispatch<SetStateAction<string>>,
  therapistRole: SessionType
) => {
  const { mutate: addTherapistMutation, isPending: isAddTherapistLoading } =
    useMutation({
      mutationFn: async () => await addTherapist(email, therapistRole),
      onSuccess: (data) => {
        successToast(data.message);
        setUserEmail("");
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { addTherapistMutation, isAddTherapistLoading };
};
