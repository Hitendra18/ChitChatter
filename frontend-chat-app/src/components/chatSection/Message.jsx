import { useSelector } from "react-redux";
import { images } from "../../constants";
import { useChatState } from "../../contexts/useChatState";

const Message = ({ messageData }) => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat } = useChatState();
  const sent = messageData.sender?._id === user._id;

  return (
    <div className={`flex w-full mt-2 ${sent && "flex-row-reverse"}`}>
      <div className={`max-w-[80%] lg:max-w-[70%] flex items-end gap-2`}>
        {!sent && (
          <img
            src={
              messageData?.sender?.avatar
                ? import.meta.env.VITE_UPLOAD_FOLDER_URL +
                  messageData?.sender?.avatar
                : images.defaultAvatar
            }
            className="w-7 h-7 rounded-full"
            alt=""
          />
        )}
        <div
          className={`rounded-xl px-4 py-2 md:px-4 md:py-2 md:text-2xl lg:text-lg lg:px-4 lg:py-1 ${
            !sent
              ? user.darkTheme
                ? "bg-[#363737]"
                : "bg-[#F2F2F2] text-[#363737]"
              : "bg-primaryBlue text-[#F2F2F2]"
          } `}
        >
          {!sent && selectedChat?.isGroupChat && (
            <p
              className={`font-medium text-sm ${
                user?.darkTheme ? "text-[#C7C7C7]" : "text-[#363737]"
              } `}
            >
              {messageData?.sender?.name}
            </p>
          )}
          <p className="break-all hyphens-auto">{messageData.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
