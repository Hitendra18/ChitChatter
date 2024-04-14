import { useEffect, useState } from "react";
import { socketContext } from "./useSocketState";
import { io } from "socket.io-client";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BASE_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [setSocket]);

  return (
    <socketContext.Provider value={{ socket, setSocket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
