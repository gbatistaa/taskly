"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseMySocketOptions {
  namespace: string;
  room: string;
}

export function useMySocket({ namespace, room }: UseMySocketOptions): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!room) return;

    const ns = namespace.startsWith("/") ? namespace : `/${namespace}`;

    const socketInstance = io(`http://localhost:4000${ns}`, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      console.log(`✅ Socket conectado [${namespace}] ID:`, socketInstance.id);
      socketInstance.emit("join-team", room);
    });

    socketInstance.on("connect_error", (err) => {
      console.error(`❌ Erro no socket [${namespace}]:`, err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [namespace, room]);

  return socket;
}
