import { useMutation } from "@tanstack/react-query";

import { sendMessage, updateSeenBy } from "../api/messages";

export const useSendMessage = (onSendMessageSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return sendMessage(data);
    },
    onSuccess: (data) => {
      if (data) {
        onSendMessageSuccess(data);
      }
    },
  });
};

export const useUpdateSeenBy = (onUpdateSeenBySuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return updateSeenBy(data);
    },
    onSuccess: (data) => {
      if (data) {
        onUpdateSeenBySuccess(data);
      }
    },
  });
};
