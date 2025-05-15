import { useEffect, useRef } from "react";

export function useBroadcastChannel(
  key: string,
  onMessage: (message: string) => void
) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (channelRef.current) channelRef.current.close();

    const bc = new BroadcastChannel(key);
    channelRef.current = bc;

    bc.onmessage = (e) => {
      onMessage(e.data);
    };
  }, [key]);

  return {
    send: (message: string) => {
      channelRef.current?.postMessage(message);
    },
  };
}
