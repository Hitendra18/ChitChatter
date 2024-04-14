import SidebarTop from "./SidebarTop";
import SidebarChatTile from "./SidebarChatTile";
import { useSelector } from "react-redux";
import { useGetAllChats } from "./../../services/queries/chats";
import { useChatState } from "../../contexts/useChatState";
import { useGetUsers } from "./../../services/queries/users";
import SidebarUserTile from "./SidebarUserTile";
import { useEffect } from "react";

const ChatsSidebar = () => {
  const { userInfo: user } = useSelector((state) => state.user);

  const { showSearchBar, searchInput, chatsData, setChatsData } =
    useChatState();

  // getting all the chats of the user
  const token = user?.token;
  const { data: receivedChatsData, isLoading: chatsDataLoading } =
    useGetAllChats({
      token,
    });

  useEffect(() => {
    setChatsData(() => {
      if (receivedChatsData && receivedChatsData.length > 0) {
        receivedChatsData?.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        return receivedChatsData;
      }
    });
  }, [setChatsData, receivedChatsData]);

  // console.log(chatsData);
  const { data: usersData, isLoading: userDataLoading } = useGetUsers({
    token,
    searchKeyword: searchInput,
  });

  useEffect(() => {
    setChatsData((prev) => {
      prev?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return prev;
    });
  }, [setChatsData, chatsData]);

  return (
    <div
      className={`flex flex-col h-[100vh] overflow-hidden gap-2 lg:w-[600px]`}
    >
      {/* chat sidebar top */}
      <div
        className={`sticky top-0 left-0 ${
          user?.darkTheme
            ? "bg-[#1A1B1B] text-white"
            : "bg-white text-[#363636]"
        }`}
      >
        <SidebarTop />
      </div>

      {/* chat sidebar chats */}
      {showSearchBar ? (
        <div
          className={`flex flex-col overflow-y-scroll flex-grow gap-2 px-2 ${
            user?.darkTheme ? "custom-scrollbar-dark" : "custom-scrollbar-light"
          }`}
        >
          {searchInput ? (
            userDataLoading ? (
              <p className="text-center text-2xl mt-10">Loading...</p>
            ) : usersData && usersData?.length === 0 ? (
              <p className="text-center text-2xl mt-10">No users to show</p>
            ) : (
              <>
                {usersData?.map((item) => {
                  return <SidebarUserTile userData={item} key={item?._id} />;
                })}
              </>
            )
          ) : (
            <p className="text-center text-lg md:text-2xl mt-10">
              Search for new users...
            </p>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-col gap-2 px-2 overflow-y-scroll flex-grow ${
            user?.darkTheme ? "custom-scrollbar-dark" : "custom-scrollbar-light"
          }`}
        >
          {chatsDataLoading ? (
            <p className="text-center text-2xl mt-10">Loading...</p>
          ) : !chatsData || chatsData?.length === 0 ? (
            <p className="text-center text-2xl mt-10">No chats to show</p>
          ) : (
            <>
              {chatsData?.map((chat) => {
                return <SidebarChatTile chatData={chat} key={chat?._id} />;
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default ChatsSidebar;
