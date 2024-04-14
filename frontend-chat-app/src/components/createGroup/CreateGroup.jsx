import { useSelector } from "react-redux";
import { useChatState } from "../../contexts/useChatState";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useGetUsers } from "../../services/queries/users";
import CreateGroupUserTile from "./CreateGroupUserTile";
import { useCreateGroupStates } from "../../contexts/useCreateGroupStates";
import SelectedUser from "./SelectedUser";
import { useCreateGroupChat } from "../../services/mutations/chats";
import { useSocketState } from "../../contexts/useSocketState";

const CreateGroup = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const [groupName, setGroupName] = useState("");

  const { selectedUsers } = useCreateGroupStates();
  const { setShowCreateGroup, setChatsData } = useChatState();
  const { socket } = useSocketState();

  const { data: usersData } = useGetUsers({
    token: user?.token,
    searchKeyword: searchInput,
  });

  const onGroupChatCreation = (data) => {
    socket.emit("group chat created", {
      receivers: selectedUsers.map((item) => item._id),
      chat: data,
    });

    setChatsData((prevChatsData) => {
      if (!prevChatsData) {
        return [data];
      }
      return [...prevChatsData, data];
    });
  };

  const { mutate: createGroupChatMutate } =
    useCreateGroupChat(onGroupChatCreation);

  const usersToShow = usersData?.filter(
    (item1) => !selectedUsers.some((item2) => item1?._id === item2?._id)
  );

  const handleSearchUsers = (e) => {
    if (e.target.value.trim() === "") {
      setSearchInput("");
      return;
    }
    setSearchInput(e.target.value);
  };

  const handleCreateGroupChat = () => {
    const users = selectedUsers.map((item) => item._id);

    createGroupChatMutate({
      users,
      chatName: groupName,
      token: user?.token,
    });
    // console.log("selectedUsers", users);

    setShowCreateGroup(false);
  };

  return (
    <div
      className={`absolute flex flex-col gap-3 w-[90%] max-w-[600px] top-1/2 left-1/2 border transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl ${
        user?.darkTheme
          ? "bg-[#1A1B1B] text-white border-[#9B9B9B]"
          : "bg-white text-[#363636] border-[#DCDCDC]"
      }`}
    >
      {/* title and close */}
      <div className="flex items-center justify-between px-1">
        <div className="font-semibold text-lg md:text-xl">Create New Group</div>
        <button
          onClick={() => setShowCreateGroup(false)}
          className={`rounded-full ${
            user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
          }`}
        >
          <RxCross2 className="text-primaryBlue h-8 w-8 p-1" />
        </button>
      </div>

      {/* body */}
      <div className="flex flex-col gap-4">
        {/* Group Name */}
        <div className="">
          <label
            className="w-[100px] md:w-[150px] font-medium md:text-lg"
            htmlFor="groupName"
          >
            Group Name
          </label>
          <div className="flex flex-col">
            <input
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setGroupName("");
                  return;
                }
                setGroupName(e.target.value);
              }}
              className={`w-full outline-none px-2 py-2 pl-4 rounded-lg md:text-lg ${
                user?.darkTheme
                  ? "bg-[#363737] text-[#DCDCDC]"
                  : "bg-[#F2F2F2] text-[#626262]"
              }`}
              type="text"
              id="groupName"
            />
            {!groupName && (
              <p className="text-xs text-red-600">
                {"Group name is required!"}
              </p>
            )}
          </div>
        </div>

        {/* search Users */}
        <div className="">
          {/* Search Bar */}
          <div
            className={`w-full flex rounded-lg overflow-hidden items-stretch ${
              user?.darkTheme
                ? "bg-[#363737] text-[#DCDCDC]"
                : "bg-[#F2F2F2] text-[#626262]"
            }`}
          >
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchUsers}
              name=""
              id=""
              placeholder="Search people..."
              className="md:text-lg w-full pl-4 py-2 md:pl-6 md:py-3 lg:py-3 outline-none bg-transparent"
            />
            <div className="flex items-center px-4 text-[#9B9B9B]">
              <IoSearchOutline className="h-6 w-6 md:h-8 md:w-8 lg:h-8 lg:w-8" />
            </div>
          </div>

          {/* Show search results */}
          <div
            className={`absolute mt-2 w-full rounded-xl overflow-clip max-h-[150px] md:max-h-[300px] lg:max-h-[400px] overflow-y-scroll z-[100] ${
              usersToShow?.length > 0 ? "border" : ""
            } ${
              user?.darkTheme
                ? "bg-[#1A1B1B] text-white border-[#9B9B9B] custom-scrollbar-dark"
                : "bg-white text-[#363636] border-[#DCDCDC] custom-scrollbar-light"
            }`}
          >
            {usersToShow &&
              usersToShow.length > 0 &&
              usersToShow.map((item) => {
                return <CreateGroupUserTile userData={item} key={item?._id} />;
              })}
          </div>
        </div>

        {/* Selected Users */}
        <div className="">
          <p className="font-medium md:text-lg">
            Selected Members ({selectedUsers ? selectedUsers.length : 0})
          </p>
          <div
            className={`max-h-[300px] md:max-h-[400px] lg:max-h-[400px] overflow-y-scroll space-y-0.5 ${
              user?.darkTheme
                ? "custom-scrollbar-dark"
                : "custom-scrollbar-light"
            }`}
          >
            {selectedUsers &&
              selectedUsers.length > 0 &&
              selectedUsers.map((item) => {
                return <SelectedUser userData={item} key={item?._id} />;
              })}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleCreateGroupChat}
        disabled={!groupName || selectedUsers.length <= 0}
        className="bg-primaryBlue rounded-lg py-2 text-white font-medium text-xl mt-2 hover:bg-blue-600 p-2 transition-colors duration-200 disabled:opacity-50 disabled:bg-blue-600 disabled:cursor-not-allowed"
      >
        Create Group
      </button>
    </div>
  );
};
export default CreateGroup;
