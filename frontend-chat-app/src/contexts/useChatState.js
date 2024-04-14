import { createContext, useContext } from "react";

export const chatContext = createContext(null);

export const useChatState = () => {
  return useContext(chatContext);
};
