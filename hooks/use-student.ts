import { initialStudentFormState } from "@/components/forms/student-form";
import { errorToast, successToast } from "@/components/shared/toasts";
import { createStudent } from "@/lib/api/student/api";
import { Student } from "@/types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useCreateStudent = (
  formData: Student,
  setFormData: Dispatch<SetStateAction<Student>>,
  setIsAddStudentOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  const { mutate: createStudentMutation, isPending: isCreateStudentLoading } =
    useMutation({
      mutationFn: async () => await createStudent(formData),
      onSuccess: (data) => {
        successToast(data.data.message);
        setFormData(initialStudentFormState);
        setIsAddStudentOpen(false);
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { createStudentMutation, isCreateStudentLoading };
};
