import { useChatState } from "../../contexts/useChatState";
import ChatSectionTop from "./ChatSectionTop";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";
import ShowMessages from "./ShowMessages";
import { images } from "../../constants";
import { useSocketState } from "../../contexts/useSocketState";
import { useEffect } from "react";
import MessagesDataProvider from "../../contexts/MessagesDataProvider";
import { useAccessRegularChat } from "../../services/mutations/chats";

const ChatSection = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat, setSelectedChat, chatsData, setChatsData } =
    useChatState();
  const { socket } = useSocketState();

  const accessRegularChatSuccess = (data) => {
    // add chat to chatData
    setChatsData((prevChatsData) => {
      if (!prevChatsData) {
        return [data];
      }
      console.log("Hello");
      return [...prevChatsData, data];
    });
  };

  const { mutate: accessRegularChatMutate } = useAccessRegularChat(
    accessRegularChatSuccess
  );

  useEffect(() => {
    if (socket) {
      socket.on("message received", (message) => {
        // Message received in in selected chat
        console.log("message received", message);
        if (selectedChat && selectedChat?._id === message?.chat) {
          setSelectedChat((previous) => {
            return { ...previous, latestMessage: message };
          });
        }

        // setting chatsData
        setChatsData((prev) => {
          console.log("prev", prev);
          if (prev && prev.length > 0) {
            const toReturn = prev.map((item) => {
              if (item?._id === message?.chat) {
                item.latestMessage = message;
                return item;
              }
              return item;
            });
            return toReturn;
          } else {
            accessRegularChatMutate({
              token: user?.token,
              receiverId: message?.sender?._id,
            });
            console.log("prev else", prev);
            return prev;
          }
        });
      });
    }
    return () => {
      if (socket && selectedChat) socket.off("message received");
    };
  }, [
    socket,
    selectedChat,
    chatsData,
    setChatsData,
    accessRegularChatMutate,
    setSelectedChat,
    user?.token,
  ]);

  useEffect(() => {
    if (socket) {
      socket.on("added to group chat", (chat) => {
        setChatsData((prevChatsData) => {
          if (!prevChatsData) {
            return [chat];
          }
          return [...prevChatsData, chat];
        });
      });
    }

    return () => {
      if (socket) socket.off("added to group chat");
    };
  }, [socket, setChatsData]);

  return (
    <MessagesDataProvider>
      <div
        className={`${
          selectedChat ? "absolute" : "hidden"
        } lg:relative lg:block lg:w-full inset-0 lg:h-[100vh] lg:border-l ${
          user?.darkTheme
            ? "lg:border-l-[#9B9B9B] bg-[#1A1B1B]"
            : "lg:border-l-[#DCDCDC] bg-white"
        }`}
      >
        {selectedChat ? (
          <div className="flex flex-col h-[100vh] overflow-hidden">
            <div className="">
              <ChatSectionTop />
            </div>
            <div
              className={`px-4 overflow-y-scroll flex-grow ${
                user?.darkTheme
                  ? "custom-scrollbar-dark"
                  : "custom-scrollbar-light"
              }`}
            >
              <ShowMessages />
            </div>
            <div className="px-2 left-0 mt-2">
              <SendMessage />
            </div>
          </div>
        ) : (
          <div
            className={`hidden lg:flex lg:flex-col lg:gap-4 lg:items-center lg:justify-center lg:h-full ${
              user?.darkTheme ? "lg:text-[#DCDCDC]" : "lg:text-[#363636]"
            }`}
          >
            <img src={images.Logo} alt="" />
            <p>Send and receive messages easily...</p>
          </div>
        )}
      </div>
    </MessagesDataProvider>
  );
};
export default ChatSection;
