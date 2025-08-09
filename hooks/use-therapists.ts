import { getAllTherapists } from "@/lib/api/users/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTherapists = ({
  offset,
  filter,
}: {
  offset?: number;
  filter: string;
}) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [offset, filter],
    queryFn: () => getAllTherapists(filter),
  });

  return {
    allTherapists: data,
    isAllTherapistsLoading: isLoading,
    isAllTherapistsError: isError,
    refetchAllTherapists: refetch,
    isAllTherapistsRefetching: isRefetching,
  };
};
