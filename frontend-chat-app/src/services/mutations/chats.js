import { useMutation } from "@tanstack/react-query";
import {
  accessRegularChat,
  createGroupChat,
  updateGroupAvatar,
} from "../api/chats";
import { useChatState } from "../../contexts/useChatState";

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

export const useUpdateGroupAvatar = () => {
  const { setSelectedChat } = useChatState();
  return useMutation({
    mutationFn: ({ formData, token, chatId }) => {
      return updateGroupAvatar({ formData, token, chatId });
    },
    onSuccess: (data) => {
      console.log("data", data);
      if (data) {
        setSelectedChat((prev) => {
          if (prev) {
            prev.avatar = data.avatar;
          }
          return prev;
        });
      }
    },
  });
};
