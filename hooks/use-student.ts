import { initialStudentFormState } from "@/components/forms/student-form";
import { errorToast, successToast } from "@/components/shared/toasts";
import { createStudent, getAllStudents } from "@/lib/api/student/api";
import { STUDENTS_QUERY_KEY } from "@/lib/utils";
import { Student } from "@/types/student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useGetAllStudents = ({
  offset,
  filter,
}: {
  offset: string | undefined;
  filter: string;
}) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [STUDENTS_QUERY_KEY, offset, filter],
    queryFn: () => getAllStudents(filter),
  });

  return {
    allStudents: data,
    isAllStudentsLoading: isLoading,
    isAllStudentsError: isError,
    refetchAllStudents: refetch,
    isAllStudentsRefetching: isRefetching,
  };
};

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
        queryClient.invalidateQueries({
          queryKey: [STUDENTS_QUERY_KEY],
        });
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { createStudentMutation, isCreateStudentLoading };
};
