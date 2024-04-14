import { useCallback, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useSendMessage } from "../../services/mutations/messages";
import { useChatState } from "../../contexts/useChatState";
import { useSocketState } from "../../contexts/useSocketState";
import { useMessagesDataState } from "../../contexts/useMessagesDataState";
import { getReceivers } from "../../utils/getReceivers";

const SendMessage = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const [content, setContent] = useState("");

  const { selectedChat, setSelectedChat, setChatsData } = useChatState();
  const { socket } = useSocketState();
  const { setMessagesData } = useMessagesDataState();

  const onSendMessageSuccess = useCallback(
    (data) => {
      const receivers = getReceivers(selectedChat, user?._id);

      socket.emit("message sent", {
        receivers,
        message: data,
      });
      console.log("message sent", data);

      setMessagesData((previous) => {
        if (previous && previous.length > 0) {
          return [...previous, { ...data }];
        }
        return [{ ...data }];
      });

      setSelectedChat((previous) => {
        return { ...previous, latestMessage: data };
      });

      const updatedChat = { ...selectedChat, latestMessage: data };

      setChatsData((previous) => {
        if (!previous) {
          return [updatedChat];
        }
        const chatIndex = previous.findIndex(
          (item) => item?._id === selectedChat._id
        );
        if (chatIndex !== -1) {
          return previous.map((item, index) =>
            index === chatIndex ? updatedChat : item
          );
        } else {
          return [...previous, updatedChat];
        }
      });
    },
    [selectedChat, setChatsData, setMessagesData, setSelectedChat, socket, user]
  );

  const { mutate } = useSendMessage(onSendMessageSuccess);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (content === "") {
      return;
    }

    mutate({
      token: user?.token,
      chatId: selectedChat._id,
      content,
    });

    /*
    const latestMessage = {
      chat: selectedChat._id,
      content,
      sender: { _id: user?._id, name: user?.name, avatar: user?.avatar },
    };

    const sendInChat =
      !selectedChat?.latestMessage && !selectedChat.isGroupChat && selectedChat;

    socket.emit(
      "message sent",
      {
        receivers: selectedChat.receivers,
        message: latestMessage,
      },
      sendInChat
    );

    setMessagesData((previous) => {
      if (previous && previous.length > 0) {
        return [...previous, { ...latestMessage }];
      }
      return [{ ...latestMessage }];
    });

    setSelectedChat((previous) => {
      return { ...previous, latestMessage };
    });

    setChatsData((previous) => {
      if (!previous) {
        return [{ ...selectedChat, latestMessage }];
      }
      const chatIndex = previous.findIndex(
        (item) => item?._id === selectedChat._id
      );
      if (chatIndex !== -1) {
        return previous.map((item, index) =>
          index === chatIndex ? { ...selectedChat, latestMessage } : item
        );
      } else {
        return [...previous, { ...selectedChat, latestMessage }];
      }
    });*/

    setContent("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className={`w-full flex rounded-2xl gap-4 px-4 py-2 md:px-6 md:py-4 lg:px-4 lg:py-2 lg:pl-6 mb-2 ${
        user?.darkTheme
          ? "bg-[#363737] text-[#DCDCDC]"
          : "bg-[#F2F2F2] text-[#626262]"
      }`}
    >
      <input
        type="text"
        value={content}
        onChange={(e) => {
          if (e.target.value.trim() === "") {
            setContent("");
            return;
          }
          setContent(e.target.value);
        }}
        placeholder="Type something..."
        className="text-lg md:text-2xl lg:text-xl w-full outline-none bg-transparent"
      />
      <button
        type="submit"
        className="bg-primaryBlue hover:bg-blue-600 p-2 rounded-full transition-colors duration-200"
      >
        <IoIosSend className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </button>
    </form>
  );
};
export default SendMessage;
