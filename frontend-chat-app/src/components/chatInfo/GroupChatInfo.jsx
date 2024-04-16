import { useSelector } from "react-redux";
import { images } from "../../constants";
import { useChatState } from "../../contexts/useChatState";
import { toast } from "react-toastify";
import { useUpdateGroupAvatar } from "../../services/mutations/chats";

const GroupChatInfo = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { selectedChat } = useChatState();
  let groupOwner = selectedChat.groupOwner;
  const users = [];

  // for loop over selectedChat?.users
  for (let i = 0; i < selectedChat?.users.length; i++) {
    if (selectedChat.users[i]._id === groupOwner) {
      groupOwner = selectedChat.users[i];
      continue;
    }
    users.push(selectedChat.users[i]);
  }

  const { mutate: updateGroupAvatarMutate } = useUpdateGroupAvatar();

  const handleFileChange = (e) => {
    console.log("handle file change called");
    const file = e.target.files[0];
    if (file && file.size && file.size > 1 * 1024 * 1024) {
      toast.error("Max file size should be 1MB");
      return;
    }

    const formData = new FormData();
    formData.append("groupAvatar", file);
    const token = user?.token;
    updateGroupAvatarMutate({ formData, token, chatId: selectedChat?._id });
  };

  console.log("Is user the owner", user?._id === groupOwner?._id);

  return (
    <div className="flex flex-col max-w-[300px] flex-grow gap-4 px-10">
      <label htmlFor="groupAvatar">
        <img
          src={
            selectedChat?.avatar
              ? import.meta.env.VITE_UPLOAD_FOLDER_URL + selectedChat?.avatar
              : images.defaultGroupAvatar
          }
          className="rounded-full h-40 w-40 mx-10 object-cover hover:brightness-50 transition-all duration-300 hover:cursor-pointer"
          alt=""
        />
      </label>
      <div className="self-center text-3xl font-semibold">
        {selectedChat?.chatName}
      </div>
      {user?._id === groupOwner?._id && (
        <input
          type="file"
          id="groupAvatar"
          className="sr-only"
          onChange={handleFileChange}
        />
      )}
      <div className="flex flex-col gap-3 self-start">
        <div className="text-lg font-semibold flex flex-col gap-1">
          <div className="">Group Owner</div>
          <div className="flex gap-2 items-center px-2">
            <img
              src={
                groupOwner?.avatar
                  ? import.meta.env.VITE_UPLOAD_FOLDER_URL + groupOwner?.avatar
                  : images.defaultGroupAvatar
              }
              alt=""
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col">
              <div className="text-sm font-medium">{groupOwner.name}</div>
              <div className="text-xs font-normal">{groupOwner.email}</div>
            </div>
          </div>
        </div>
        <div
          className={`text-lg font-semibold max-h-[300px] overflow-y-scroll flex flex-col gap-1 ${
            user?.darkTheme ? "custom-scrollbar-dark" : "custom-scrollbar-light"
          }`}
        >
          <div className="">Group Member</div>
          <div className="flex flex-col gap-1">
            {users?.map((item) => {
              return (
                <div key={item._id} className="flex gap-2 items-center px-2">
                  <img
                    src={
                      item?.avatar
                        ? import.meta.env.VITE_UPLOAD_FOLDER_URL + item?.avatar
                        : images.defaultGroupAvatar
                    }
                    alt=""
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs font-normal">{item.email}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GroupChatInfo;
