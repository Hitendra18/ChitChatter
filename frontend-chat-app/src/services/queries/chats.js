import { useQuery } from "@tanstack/react-query";
import { getAllChats, getRegularChat } from "../api/chats";

export const useGetAllChats = (data) => {
  return useQuery({
    queryKey: ["getAllChats"],
    queryFn: () => getAllChats(data),
  });
};

export const useRegularChat = ({ token, receiverId }) => {
  return useQuery({
    queryKey: ["getRegularChat", { receiverId }],
    queryFn: () => getRegularChat({ token, receiverId }),
  });
};
