import { errorToast, successToast } from "@/components/shared/toasts";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
} from "@/lib/api/student/api";
import { STUDENT_QUERY_KEY, STUDENTS_QUERY_KEY } from "@/lib/utils";
import { StudentT } from "@/types/student.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

export const useGetSingleStudent = (id: string, date: Date | undefined) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [STUDENT_QUERY_KEY, id, date],
    queryFn: () => getSingleStudent(id, date),
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
      mutationFn: async (formData: StudentT) => await createStudent(formData),
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

export const useDeleteStudent = (id?: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteStudentMutation, isPending: isDeleteStudentLoading } =
    useMutation({
      mutationFn: async () => await deleteStudent(id!),
      onSuccess: (data) => {
        successToast(data.data.message);
        queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
      },
      onError: ({ message }: { message: string }) => {
        errorToast(message);
      },
    });
  return { deleteStudentMutation, isDeleteStudentLoading };
};
