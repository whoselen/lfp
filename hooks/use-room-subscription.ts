import useRoomStore from "@/stores/room-store";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useEffect } from "react";

const useRoomSubscription = () => {
  const updateParticipant = useRoomStore((state) => state.updateParticipant);
  const supabase = useSupabaseBrowser();

  useEffect(() => {
    const subscription = supabase
      .channel("room_users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_users" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            updateParticipant(
              payload.new.room_id,
              payload.new.user_id,
              payload.new,
              "join"
            );
          }
          if (payload.eventType === "DELETE") {
            updateParticipant(
              payload.old.room_id,
              payload.old.user_id,
              null,
              "leave"
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [updateParticipant]);
};

export default useRoomSubscription;
