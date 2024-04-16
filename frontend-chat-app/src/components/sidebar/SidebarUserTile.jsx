import { images } from "../../constants";
import { useSelector } from "react-redux";
import { useAccessRegularChat } from "../../services/mutations/chats";
import { useChatState } from "../../contexts/useChatState";
import { getReceivers } from "../../utils/getReceivers";

const SidebarUserTile = ({ userData }) => {
  const { userInfo: user } = useSelector((state) => state.user);
  // console.log(userData.name, userData);
  const { setSelectedChat } = useChatState();

  const accessRegularChatSuccess = (data) => {
    const receivers = getReceivers(data, user?._id);
    setSelectedChat({ ...data, receivers });
  };

  const { mutate } = useAccessRegularChat(accessRegularChatSuccess);

  const handleAccessRegularChat = () => {
    console.log("inside handle access regular chat", {
      token: user?.token,
      receiverId: userData?._id,
    });
    mutate({ token: user?.token, receiverId: userData?._id });
  };

  return (
    <button
      onClick={handleAccessRegularChat}
      className={`flex items-center w-full gap-4 px-4 py-2 rounded-2xl hover:cursor-pointer transition-colors duration-100 ${
        user?.darkTheme ? "hover:bg-[#363737]" : "hover:bg-[#F2F2F2]"
      }`}
    >
      <img
        src={
          userData?.avatar
            ? import.meta.env.VITE_UPLOAD_FOLDER_URL + userData?.avatar
            : images.defaultAvatar
        }
        className="w-14 h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 object-cover rounded-full shrink-0"
        alt=""
      />
      <div
        className={`flex flex-col gap-1 md:gap-2 lg:gap-1 w-full overflow-hidden ${
          user?.darkTheme ? "text-[#DCDCDC]" : "text-[#636362]"
        }`}
      >
        <div className="font-bold text-xl md:text-2xl lg:text-xl text-start">
          {userData?.name}
        </div>
        <div className="w-full text-start md:text-xl lg:text-lg shrink text-nowrap truncate">
          {userData?.email}
        </div>
      </div>
    </button>
  );
};
export default SidebarUserTile;
