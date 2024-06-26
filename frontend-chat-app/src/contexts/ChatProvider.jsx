import { useState } from "react";
import { chatContext } from "./useChatState";

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [chatsData, setChatsData] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);

  return (
    <chatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        showSearchBar,
        setShowSearchBar,
        searchInput,
        setSearchInput,
        chatsData,
        setChatsData,
        showCreateGroup,
        setShowCreateGroup,
        showChatInfo,
        setShowChatInfo,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatProvider;
