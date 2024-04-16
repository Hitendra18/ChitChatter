import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MeetPage from "./pages/MeetPage";
import ChatProvider from "./contexts/ChatProvider";

function App() {
  const { userInfo: user } = useSelector((state) => state.user);
  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  ); // Initialize Agora Client

  return (
    <div
      className={`min-h-[100vh] ${
        user?.darkTheme ? "bg-[#1A1B1B] text-white" : "bg-white text-[#363636]"
      } font-rubik`}
    >
      <Routes>
        <Route
          index
          path="/chats"
          element={
            <ChatProvider>
              <HomePage />
            </ChatProvider>
          }
        />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/meet/:meetId"
          element={
            <AgoraRTCProvider client={agoraClient}>
              <MeetPage />
            </AgoraRTCProvider>
          }
        />
      </Routes>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        stacked
        position="top-center"
      />
    </div>
  );
}

export default App;
