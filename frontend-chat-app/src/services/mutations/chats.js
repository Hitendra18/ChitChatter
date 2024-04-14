import { useMutation } from "@tanstack/react-query";
import { accessRegularChat, createGroupChat } from "../api/chats";

export const useAccessRegularChat = (onSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return accessRegularChat(data);
    },
    onSuccess: (data) => {
      if (data) {
        console.log("data useAccessRegularChat", data);
        onSuccess(data);
      }
    },
  });
};

export const useCreateGroupChat = (onGroupChatCreation) => {
  return useMutation({
    mutationFn: ({ users, chatName, token }) => {
      return createGroupChat({ users, chatName, token });
    },
    onSuccess: (data) => {
      if (data) {
        console.log("Created Group Chat", data);
        onGroupChatCreation(data);
      }
    },
  });
};
