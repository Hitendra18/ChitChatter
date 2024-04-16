import { useSelector } from "react-redux";
import { useChatState } from "../../contexts/useChatState";
import GroupChatInfo from "./GroupChatInfo";
import RegularChatInfo from "./RegularChatInfo";
import { RxCross2 } from "react-icons/rx";

const ChatInfo = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat, setShowChatInfo } = useChatState();

  return (
    <div
      className={`absolute top-0 right-0 border-l h-full flex flex-col overflow-hidden ${
        user?.darkTheme
          ? "bg-[#1A1B1B] text-white border-[#9B9B9B]"
          : "bg-white text-[#363636] border-[#DCDCDC]"
      }`}
    >
      <div className="flex items-center px-1 pt-1 pb-3">
        <button
          onClick={() => setShowChatInfo(false)}
          className={`rounded-full ${
            user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
          }`}
        >
          <RxCross2 className="text-primaryBlue h-8 w-8 p-1" />
        </button>
      </div>
      {selectedChat?.isGroupChat ? <GroupChatInfo /> : <RegularChatInfo />}
    </div>
  );
};
export default ChatInfo;
