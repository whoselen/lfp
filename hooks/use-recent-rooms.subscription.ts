import useRoomStore from "@/stores/room-store";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useEffect } from "react";

const useRecentRoomsSubscription = () => {
  const onRoomsUpdated = useRoomStore((state) => state.onRoomsUpdated);
  const supabase = useSupabaseBrowser();

  useEffect(() => {
    const subscription = supabase
      .channel("rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "DELETE"
          ) {
            onRoomsUpdated();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [onRoomsUpdated]);
};

export default useRecentRoomsSubscription;
