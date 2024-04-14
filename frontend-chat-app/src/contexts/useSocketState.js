import { createContext, useContext } from "react";

export const socketContext = createContext(null);

export const useSocketState = () => {
  return useContext(socketContext);
};
