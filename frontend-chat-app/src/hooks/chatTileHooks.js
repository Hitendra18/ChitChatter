import { useSelector } from "react-redux";
import { images } from "../constants";

export const useChatData = (chat) => {
  const { userInfo: user } = useSelector((state) => state.user);
  const chatDataToSend = {};

  if (!chat?.latestMessage) {
    chatDataToSend.latestMessage = null;
  } else if (chat?.latestMessage?.sender?._id === user._id) {
    chatDataToSend.latestMessage = "You: " + chat?.latestMessage?.content;
  }

  if (chat?.isGroupChat) {
    chatDataToSend.chatName = chat?.chatName;
    chatDataToSend.avatar = chat?.avatar
      ? chat?.avatar
      : images.defaultGroupAvatar;

    chatDataToSend.latestMessage =
      chatDataToSend?.latestMessage ||
      (chat?.latestMessage &&
        chat?.latestMessage?.sender?.name.split(" ")[0] +
          ": " +
          chat?.latestMessage?.content);
  } else {
    chatDataToSend.latestMessage =
      chatDataToSend?.latestMessage || chat?.latestMessage?.content;

    if (chat?.users[0]?._id === user?._id) {
      chatDataToSend.chatName = chat?.users[1]?.name;
      chatDataToSend.avatar = chat?.users[1]?.avatar
        ? chat?.users[1]?.avatar
        : images.defaultAvatar;
    } else {
      chatDataToSend.chatName = chat?.users[0]?.name;
      chatDataToSend.avatar = chat?.users[0]?.avatar
        ? chat?.users[0]?.avatar
        : images.defaultAvatar;
    }
  }

  return chatDataToSend;
};
