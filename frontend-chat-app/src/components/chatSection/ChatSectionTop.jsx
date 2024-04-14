import { useSelector } from "react-redux";
import { IoArrowBack, IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import { useChatState } from "../../contexts/useChatState";
import { useChatData } from "../../hooks/chatTileHooks";

const ChatSectionTop = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat, setSelectedChat } = useChatState();
  // console.log(selectedChat);
  const newChatData = useChatData(selectedChat);

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

        <div className="flex items-center md:gap-4 shrink-0 text-primaryBlue">
          <button
            className={`w-12 h-12 md:w-16 md:h-16 lg:w-12 lg:h-12   rounded-full p-2 ${
              user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
            }`}
          >
            <IoCallOutline className="w-full h-full" />
          </button>
          <button
            className={`w-12 h-12 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-full p-2 ${
              user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
            }`}
          >
            <IoVideocamOutline className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatSectionTop;
