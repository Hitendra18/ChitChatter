import { useSelector } from "react-redux";
import { IoArrowBack, IoCallOutline } from "react-icons/io5";
import { useChatState } from "../../contexts/useChatState";
import { useChatData } from "../../hooks/chatTileHooks";
import { useSocketState } from "../../contexts/useSocketState";
import { getReceivers } from "../../utils/getReceivers";

const ChatSectionTop = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat, setSelectedChat } = useChatState();
  const { socket } = useSocketState();

  const newChatData = useChatData(selectedChat);

  const startVideoCallHandler = () => {
    const receivers = getReceivers(selectedChat, user?._id);
    const uniqueChannelName = Math.random().toString(36).substring(2, 11);

    socket.emit("call started", {
      receivers,
      channelName: uniqueChannelName,
      caller: { name: user?.name, avatar: user?.avatar, email: user?.email },
      groupChatName: selectedChat?.isGroupChat ? selectedChat?.chatName : false,
    });

    const newWindow = window.open(
      window.location.origin + `/meet/${uniqueChannelName}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className={`flex flex-col px-2 py-2 md:px-4 md:py-4 lg:px-2 lg:py-3 border-b gap-5 ${
        user?.darkTheme ? "border-b-[#9B9B9B]" : "border-b-[#DCDCDC]"
      }`}
    >
      <div className="flex justify-between items-center mx-2">
        <div className="shrink-0 flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setSelectedChat(null)}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full p-2 text-primaryBlue lg:hidden ${
              user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
            }`}
          >
            <IoArrowBack className="w-full h-full" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src={newChatData?.avatar}
              alt="profile"
              className="h-10 w-10 md:h-14 md:w-14 lg:h-10 lg:w-10 object-cover rounded-full"
            />
            <div className="">
              <p
                className={`font-semibold md:text-2xl lg:text-xl ${
                  user?.darkTheme ? "text-[#DCDCDC]" : "text-[#636362]"
                }`}
              >
                {newChatData?.chatName}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={startVideoCallHandler}
          className={`flex items-center md:gap-2 lg:gap-1 shrink-0 text-primaryBlue px-2 md:pl-4 rounded-lg ${
            user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
          }`}
        >
          <div
            className={
              selectedChat?.isGroupChat
                ? "hidden md:block md:text-[22px] lg:text-lg"
                : "hidden"
            }
          >
            Start Group Call
          </div>
          <div
            className={`w-10 h-10 p-1 md:p-2 md:w-14 md:h-14 lg:w-12 lg:h-12`}
          >
            <IoCallOutline className="w-full h-full" />
          </div>
        </button>
      </div>
    </div>
  );
};
export default ChatSectionTop;
