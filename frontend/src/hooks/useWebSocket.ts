import { useEffect, useState } from "react";

export function useWebSocket(id: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [board, setBoard] = useState("");
  const [fresh, setFresh] = useState(true);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${id}`);

    socket.onopen = () => setWs(socket);
    socket.onmessage = (event) => setBoard(event.data);
    socket.onclose = () => setWs(null);

    return () => {
      socket.close();
    };
  }, [fresh]);

  const refresh = () => setFresh(!fresh);

  return { ws, board, refresh };
}
