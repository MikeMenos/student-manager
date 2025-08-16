import { errorToast, successToast } from "@/components/shared/toasts";
import { createSession, deleteSession } from "@/lib/api/session/api";
import { STUDENT_QUERY_KEY, STUDENTS_QUERY_KEY } from "@/lib/utils";
import { SessionT } from "@/types/session.type";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  const { mutate: createSessionMutation, isPending: isCreateSessionLoading } =
    useMutation({
      mutationFn: async (formData: SessionT) => await createSession(formData),
      onSuccess: (data) => {
        successToast(data.data.message);
        queryClient.invalidateQueries({
          queryKey: [STUDENTS_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [STUDENT_QUERY_KEY],
        });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorToast(error.response!.data.message!);
      },
    });
  return { createSessionMutation, isCreateSessionLoading };
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSessionMutation, isPending: isDeleteSessionLoading } =
    useMutation({
      mutationFn: async (id: string) => await deleteSession(id),
      onSuccess: (data) => {
        successToast(data.data.message);
        queryClient.invalidateQueries({
          queryKey: [STUDENT_QUERY_KEY],
        });
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return {
    deleteSessionMutation,
    isDeleteSessionLoading,
  };
};
