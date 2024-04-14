import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../api/messages";

export const useGetAllMessages = (data) => {
  return useQuery({
    queryKey: ["getAllMessages", { chatId: data.chatId }],
    queryFn: () => getAllMessages(data),
  });
};
