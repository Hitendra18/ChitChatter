import { useEffect, useRef } from "react";
import { useChatState } from "../../contexts/useChatState";
import { useGetAllMessages } from "../../services/queries/messages";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useSocketState } from "../../contexts/useSocketState";
import { useMessagesDataState } from "../../contexts/useMessagesDataState";
import { useUpdateSeenBy } from "../../services/mutations/messages";

const ShowMessages = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat } = useChatState();
  const { socket } = useSocketState();
  const { messagesData, setMessagesData } = useMessagesDataState();

  const messagesEndRef = useRef(null);

  const { data: receivedMessagesData } = useGetAllMessages({
    token: user?.token,
    chatId: selectedChat._id,
  });
  const { mutate: updateSeenByMutate } = useUpdateSeenBy();

  useEffect(() => {
    setMessagesData(() => {
      if (receivedMessagesData && receivedMessagesData.length > 0) {
        return [...receivedMessagesData];
      }
    });
  }, [setMessagesData, receivedMessagesData]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (message) => {
        // if message is received in the selected chat show that
        if (selectedChat && selectedChat?._id === message?.chat) {
          message?.seenBy?.push(user?.id);
          updateSeenByMutate({ token: user?.token, chatId: selectedChat?._id });
          setMessagesData((prevMessages) => {
            return [...prevMessages, message];
          });
        }
      });
    }
    return () => {
      if (socket && selectedChat) socket.off("message received");
    };
  }, [socket, selectedChat, setMessagesData, updateSeenByMutate, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messagesEndRef, selectedChat, messagesData]);

  return (
    <div className="">
      {messagesData &&
        messagesData?.length !== 0 &&
        messagesData.map((item, index) => (
          <Message messageData={item} key={item?._id || index} />
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
export default ShowMessages;
