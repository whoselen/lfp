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
          if (payload.eventType === "DELETE") {
            // Ensure room_id is available during delete event

            updateParticipant(
              payload.old.id,
              undefined,
              undefined,
              null,
              "leave"
            );
          }
          if (payload.eventType === "INSERT") {
            updateParticipant(
              payload.new.id,
              payload.new.room_id,
              payload.new.user_id,
              payload.new,
              "join"
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [updateParticipant, supabase]);
};

export default useRoomSubscription;
