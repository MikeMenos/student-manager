import { errorToast, successToast } from "@/components/shared/toasts";
import { createAttendance } from "@/lib/api/attendance/api";
import { STUDENT_QUERY_KEY, STUDENTS_QUERY_KEY } from "@/lib/utils";
import { AttendanceT } from "@/types/attendance.type";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createAttendanceMutation,
    isPending: isCreateAttendanceLoading,
  } = useMutation({
    mutationFn: async (formData: AttendanceT) =>
      await createAttendance(formData),
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
  return { createAttendanceMutation, isCreateAttendanceLoading };
};
