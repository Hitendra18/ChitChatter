import { createContext, useContext } from "react";

export const createGroupContext = createContext(null);

export const useCreateGroupStates = () => {
  return useContext(createGroupContext);
};
