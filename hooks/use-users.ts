import { getAllUsers } from "@/lib/api/users/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = ({
  offset,
  filter,
}: {
  offset?: number;
  filter: string;
}) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [offset, filter],
    queryFn: () => getAllUsers(filter, offset),
  });

  return {
    allUsers: data,
    isAllUsersLoading: isLoading,
    isAllUsersError: isError,
    refetchAllUsers: refetch,
    isAllUsersRefetching: isRefetching,
  };
};
