import { useState } from "react";
import { createGroupContext } from "./useCreateGroupStates";

const CreateGroupProvider = ({ children }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <createGroupContext.Provider value={{ selectedUsers, setSelectedUsers }}>
      {children}
    </createGroupContext.Provider>
  );
};

export default CreateGroupProvider;
