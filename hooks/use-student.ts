import { initialStudentFormState } from "@/components/forms/student-form";
import { errorToast, successToast } from "@/components/shared/toasts";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
} from "@/lib/api/student/api";
import { STUDENT_QUERY_KEY, STUDENTS_QUERY_KEY } from "@/lib/utils";
import { Student } from "@/types/student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

export const useGetSingleStudent = (id: string) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [STUDENT_QUERY_KEY, id],
    queryFn: () => getSingleStudent(id),
  });

  return {
    singleStudent: data,
    isSingleStudentLoading: isLoading,
    isSingleStudentError: isError,
    refetchSingleStudent: refetch,
    isSingleStudentRefetching: isRefetching,
  };
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  const { mutate: createStudentMutation, isPending: isCreateStudentLoading } =
    useMutation({
      mutationFn: async (formData: Student) => await createStudent(formData),
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
  return { createStudentMutation, isCreateStudentLoading };
};
