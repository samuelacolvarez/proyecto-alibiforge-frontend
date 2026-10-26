import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [conectado, setConectado] = useState(socket.connected);

  useEffect(() => {
    function onConnected() {
      setConectado(true);
    }
    function onDisconnected() {
      setConectado(false);
    }

    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);

    // Conecta solo si hay un usuario con sesión.
    if (user) socket.connect();
    else socket.disconnect();

    // Limpiar los listeners al desmontar el componente
    return () => {
      socket.off("connect", onConnected);
      socket.off("disconnect", onDisconnected);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, conectado }}>
      {children}
    </SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook compañero del provider
export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket debe usarse dentro de <SocketProvider>");
  return ctx;
}