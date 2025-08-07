import { errorToast, successToast } from "@/components/shared/toasts";
import { inviteUser } from "@/lib/api/invitation/api";
import { SessionType } from "@/types/attendance.type";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useInviteUser = (
  email: string,
  setUserEmail: Dispatch<SetStateAction<string>>,
  therapistRole: SessionType
) => {
  const { mutate: inviteUserMutation, isPending: isInviteUserLoading } =
    useMutation({
      mutationFn: async () => await inviteUser(email, therapistRole),
      onSuccess: (data) => {
        successToast(data.message);
        setUserEmail("");
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { inviteUserMutation, isInviteUserLoading };
};
