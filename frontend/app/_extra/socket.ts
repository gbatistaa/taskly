import { io, Socket } from "socket.io-client";

export function createSocketClient(namespace: string): Socket {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const ns = namespace.startsWith("/") ? namespace : `/${namespace}`;

  return io(`${baseUrl}${ns}`, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
}
