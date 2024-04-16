import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatSection from "../components/chatSection/ChatSection";
import ChatSidebar from "../components/sidebar/ChatsSidebar";
import { useSocketState } from "../contexts/useSocketState";
import { useChatState } from "../contexts/useChatState";
import CreateGroup from "../components/createGroup/CreateGroup";
import CreateGroupProvider from "../contexts/CreateGroupProvider";
import { toast } from "react-toastify";
import IncomingCallToast from "../components/IncomingCallToast";
import ChatInfo from "../components/chatInfo/ChatInfo";

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo: user } = useSelector((state) => state.user);
  const { showCreateGroup, showChatInfo } = useChatState();
  const { socket } = useSocketState();

  // if user doesn't exists
  useEffect(() => {
    if (!user) {
      navigate("/");
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

  useEffect(() => {
    if (socket) {
      socket.on("call received", ({ channelName, caller, groupChatName }) => {
        console.log("call received", { channelName, caller, groupChatName });
        toast(
          <IncomingCallToast
            name={caller?.name}
            avatar={caller?.avatar}
            email={caller?.email}
            groupChatName={groupChatName}
            onJoin={() => {
              console.log("User joined");

              navigate(`/meet/${channelName}`);

              toast.dismiss(); // Close the toast
            }}
            onReject={() => {
              toast.dismiss(); // Close the toast
            }}
          />,
          {
            position: "top-center",
            autoClose: 30000,
            closeButton: false,
            closeOnClick: false,
            theme: user?.darkTheme ? "dark" : "light",
          }
        );
      });
    }
  }, [socket, user?.darkTheme]);

  return (
    <div className="relative">
      <div
        className={`lg:flex  ${
          showCreateGroup || showChatInfo
            ? "pointer-events-none"
            : "pointer-events-auto"
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
      {showChatInfo && <ChatInfo />}
    </div>
  );
};
export default HomePage;
