import { errorToast, successToast } from "@/components/shared/toasts";
import {
  deleteUserFromClerkAndDb,
  getAllTherapists,
  getSingleTherapist,
} from "@/lib/api/users/api";
import { THERAPIST_QUERY_KEY, THERAPISTS_QUERY_KEY } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllTherapists = ({
  offset,
  filter,
}: {
  offset?: number;
  filter: string;
}) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [THERAPISTS_QUERY_KEY, offset, filter],
    queryFn: () => getAllTherapists(filter),
    staleTime: 0,
  });

  return {
    allTherapists: data,
    isAllTherapistsLoading: isLoading,
    isAllTherapistsError: isError,
    refetchAllTherapists: refetch,
    isAllTherapistsRefetching: isRefetching,
  };
};

export const useGetSingleTherapist = (therapistId: string) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [THERAPIST_QUERY_KEY, therapistId],
    queryFn: () => getSingleTherapist(therapistId),
    enabled: !!therapistId,
    staleTime: 0,
  });

  return {
    singleTherapist: data,
    isSingleTherapistLoading: isLoading,
    isSingleTherapistError: isError,
    refetchTherapistStudent: refetch,
    isSingleTherapistRefetching: isRefetching,
  };
};

export const useDeleteClientFromClerkAndDb = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUserFromClerkAndDbMutation,
    isPending: isDeleteUserFromClerkAndDbLoading,
  } = useMutation({
    mutationFn: async ({
      clerkUserId,
      dbUserId,
    }: {
      clerkUserId: string;
      dbUserId: string;
    }) => await deleteUserFromClerkAndDb({ clerkUserId, dbUserId }),
    onSuccess: (data) => {
      successToast(data.data.message);
      queryClient.invalidateQueries({
        queryKey: [THERAPISTS_QUERY_KEY],
      });
    },
    onError: ({ message }: { message: string }) => {
      errorToast(message);
    },
  });
  return {
    deleteUserFromClerkAndDbMutation,
    isDeleteUserFromClerkAndDbLoading,
  };
};
