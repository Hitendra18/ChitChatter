import { useSelector } from "react-redux";
import { images } from "../../constants";
import { useChatState } from "../../contexts/useChatState";

const RegularChatInfo = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat } = useChatState();
  const userData = selectedChat?.users?.find((item) => item?._id !== user?._id);

  return (
    <div className="flex flex-col items-center px-10 max-w-[300px] gap-4">
      <img
        src={
          userData?.avatar
            ? import.meta.env.VITE_UPLOAD_FOLDER_URL + userData?.avatar
            : images.defaultAvatar
        }
        className="rounded-full h-40 w-40 object-cover shrink"
        alt=""
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl font-semibold">{userData?.name}</div>
        <div className="text-xl">{userData?.email}</div>
      </div>
    </div>
  );
};
export default RegularChatInfo;
