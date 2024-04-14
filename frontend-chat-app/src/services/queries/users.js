import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./../api/users";

export const useGetUsers = (data) => {
  return useQuery({
    queryKey: ["getUsers", { searchKeyword: data.searchKeyword }],
    queryFn: () => getUsers(data),
  });
};
