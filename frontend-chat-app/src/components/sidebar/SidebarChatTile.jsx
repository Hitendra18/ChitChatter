import { useSelector } from "react-redux";
import { useChatState } from "../../contexts/useChatState";
import { useChatData } from "../../hooks/chatTileHooks";
import { useUpdateSeenBy } from "../../services/mutations/messages";

const SidebarChatTile = ({ chatData }) => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat, setSelectedChat } = useChatState();

  const seenLatestMessage = chatData?.latestMessage?.seenBy?.find(
    (item) => item === user?._id
  );

  const newChatData = useChatData(chatData);
  const { mutate: updateSeenByMutate } = useUpdateSeenBy();

  const handleSettingSelectedChat = () => {
    if (!seenLatestMessage) {
      chatData?.latestMessage?.seenBy?.push(user?._id);
    }
    setSelectedChat(chatData);
    updateSeenByMutate({ token: user?.token, chatId: chatData?._id });
  };

  return (
    <button
      onClick={handleSettingSelectedChat}
      className={`flex items-center w-full gap-4 px-4 py-2 rounded-2xl hover:cursor-pointer transition-colors duration-100 ${
        selectedChat?._id === chatData?._id
          ? user?.darkTheme
            ? "bg-[#202D3B]"
            : "bg-[#E8F3FF]"
          : user?.darkTheme
          ? "hover:bg-[#363737]"
          : "hover:bg-[#F2F2F2]"
      }`}
    >
      <img
        src={newChatData?.avatar}
        className="w-14 h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 object-cover rounded-full shrink-0"
        alt=""
      />
      <div
        className={`flex flex-col gap-1 md:gap-2 lg:gap-1 justify-center w-full overflow-hidden ${
          user?.darkTheme ? "text-[#DCDCDC]" : "text-[#636362]"
        }`}
      >
        <div className="font-bold text-xl md:text-2xl lg:text-xl text-start">
          {newChatData?.chatName}
        </div>
        <div
          className={`w-full text-start md:text-xl lg:text-lg shrink text-nowrap truncate ${
            seenLatestMessage || selectedChat?._id === chatData?._id
              ? "font-normal"
              : "font-medium"
          }`}
        >
          {newChatData?.latestMessage || ""}
        </div>
      </div>
    </button>
  );
};
export default SidebarChatTile;
