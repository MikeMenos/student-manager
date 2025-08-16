import { errorToast, successToast } from "@/components/shared/toasts";
import { addTherapist } from "@/lib/api/invitation/api";
import { SessionType } from "@/types/session.type";
import { useMutation } from "@tanstack/react-query";

export const useInviteTherapist = (
  email: string,
  phone: string,
  center: string,
  therapistRole: SessionType,
  resetFrom: VoidFunction
) => {
  const { mutate: addTherapistMutation, isPending: isAddTherapistLoading } =
    useMutation({
      mutationFn: async () =>
        await addTherapist(email, therapistRole, center, phone),
      onSuccess: (data) => {
        successToast(data.message);
        resetFrom();
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { addTherapistMutation, isAddTherapistLoading };
};
