import { createContext, useContext } from "react";

export const messagesDataContext = createContext(null);

export const useMessagesDataState = () => {
  return useContext(messagesDataContext);
};
