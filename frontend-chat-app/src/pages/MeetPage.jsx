import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";
import { useSelector } from "react-redux";

const MeetPage = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // if user doesn't exists
  useEffect(() => {
    if (!user) {
      navigate("/sign-up");
      return;
    }
    document.title = "ChitChatter | " + user?.name;
  }, [user, navigate]);

  const appId = import.meta.env.VITE_AGORA_APPID;
  const { meetId: channelName } = useParams();

  // set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: channelName,
      token: null,
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());
  // const arr = [...Array(1)];

  return (
    <div className="flex flex-col h-[100vh] gap-2 items-center p-1">
      {/* Users */}
      <div className="flex justify-between w-full grow flex-wrap">
        {/* Remote Users */}
        {remoteUsers.map((user) => (
          <div
            className="overflow-hidden my-1 max-h-full rounded-lg min-w-[calc(50%-12px)] max-w-full"
            key={user.uid}
          >
            <RemoteUser user={user} />
          </div>
        ))}

        {/* Local User */}
        <div
          className={`overflow-hidden my-1 min-w-[calc(50%-12px)] max-w-full rounded-lg max-h-full ${
            remoteUsers.length % 2 ? "" : "grow"
          }`}
        >
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            className=""
          />
        </div>

        {/* <div className="border border-green-500 w-full h-10"> */}
        {/* {
            // Initialize each remote stream using RemoteUser component
            remoteUsers.map((user) => (
              <div key={user.uid} className="h-28 w-28">
                <RemoteUser user={user} />
              </div>
            ))
          } */}
        {/* </div> */}

        {/* Local Users */}
        {/* <div className="border border-blue-500 w-full"> */}
        {/* <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            className=""
          /> */}
        {/* </div> */}
      </div>

      {/* Controls */}
      <div className="w-full rounded-2xl flex py-3 gap-10 items-center justify-center text-white bg-[#111B25]">
        <button
          className="bg-[#232C36] hover:bg-[#3F4950] transition-colors duration-200 rounded-lg py-2 px-3"
          onClick={() => setMicOn((a) => !a)}
        >
          {micOn ? (
            <MdMic className="h-8 w-10" />
          ) : (
            <MdMicOff className="h-8 w-10" />
          )}
        </button>
        <button
          className="bg-[#232C36] hover:bg-[#3F4950] transition-colors duration-200 rounded-lg py-2 px-3"
          onClick={() => setCameraOn((a) => !a)}
        >
          {cameraOn ? (
            <MdVideocam className="h-8 w-10" />
          ) : (
            <MdVideocamOff className="h-8 w-10" />
          )}
        </button>
        <button
          className="rounded-lg py-2 px-3 hover:bg-[#FF0000] bg-red-600"
          onClick={() => {
            setMicOn(false);
            setCameraOn(false);
            setActiveConnection(false);
            navigate("/");
          }}
        >
          <MdCallEnd className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
export default MeetPage;
