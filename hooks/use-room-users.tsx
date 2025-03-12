import { useUser } from "@/components/context/user-context";
import useSupabaseBrowser from "@/utils/supabase/client";
import { getDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useRoomUsers = () => {
  const user = useUser();
  const supabase = useSupabaseBrowser();
  const [onlineUsers, setOnlineUsers] = useState<{ user_id: string }[]>([]);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  // Presence: Track online users
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase.channel(`presence_room_${roomId}`);
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push({ user_id: channel.presenceState()[id][0].user_id });
        }
        setOnlineUsers([...userIds]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: getDate(new Date()),
            user_id: user?.id,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, roomId]);

  return {
    onlineUsers,
  };
};

export default useRoomUsers;
