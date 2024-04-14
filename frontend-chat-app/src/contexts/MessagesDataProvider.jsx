import { useState } from "react";
import { messagesDataContext } from "./useMessagesDataState";

const MessagesDataProvider = ({ children }) => {
  const [messagesData, setMessagesData] = useState(null);

  return (
    <messagesDataContext.Provider value={{ messagesData, setMessagesData }}>
      {children}
    </messagesDataContext.Provider>
  );
};

export default MessagesDataProvider;
