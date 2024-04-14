import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatSection from "../components/chatSection/ChatSection";
import ChatSidebar from "../components/sidebar/ChatsSidebar";
import { useSocketState } from "../contexts/useSocketState";
import { useChatState } from "../contexts/useChatState";
import CreateGroup from "../components/createGroup/CreateGroup";
import CreateGroupProvider from "../contexts/CreateGroupProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state) => state.user);
  const { showCreateGroup } = useChatState();
  const { socket } = useSocketState();

  // if user doesn't exists
  useEffect(() => {
    if (!user) {
      navigate("/sign-up");
      return;
    }
    document.title = "ChitChatter | " + user?.name;
  }, [user, navigate]);

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("setup user", user?._id);
    }

    return () => {
      if (socket) socket.off("setup user");
    };
  }, [socket, user]);

  return (
    <div className="relative">
      <div
        className={`lg:flex  ${
          showCreateGroup ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <ChatSidebar />
        <ChatSection />
      </div>

      {showCreateGroup && (
        <CreateGroupProvider>
          <CreateGroup />
        </CreateGroupProvider>
      )}
    </div>
  );
};
export default HomePage;
