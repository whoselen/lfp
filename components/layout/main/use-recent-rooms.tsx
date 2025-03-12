import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSupabaseBrowser from "@/utils/supabase/client";

const fetchRecentRooms = async (supabase: any) => {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
        id,
        title,
        description,
        user_id,
        game_id,
        rank_id,
        max_participants,
        room_tags ( tag_id ),
        room_accessibility_tools ( tool_id ),
        room_game_servers ( server_id )
      `
    )
    .order("inserted_at", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

const useRecentRooms = () => {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => fetchRecentRooms(supabase),
    staleTime: 1000 * 60, // Cache for 1 minute
  });

  useEffect(() => {
    const subscription = supabase
      .channel("rooms")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rooms" },
        async (payload) => {
          // Fetch the new room with related data
          //   const { data: newRoom } = await supabase
          //     .from("rooms")
          //     .select(
          //       `
          //       id,
          //       title,
          //       description,
          //       user_id,
          //       game_id,
          //       rank_id,
          //       max_participants,
          //       room_tags ( tag_id ),
          //       room_accessibility_tools ( tool_id ),
          //       room_game_servers ( server_id )
          //     `
          //     )
          //     .eq("id", payload.new.id)
          //     .single();
          //   console.log("New room created:", newRoom);
          //   if (!newRoom) return;
          //   queryClient.setQueryData(["rooms"], (oldRooms: any) => {
          //     if (!oldRooms) return [newRoom]; // If no rooms exist, initialize with the new one
          //     return [newRoom, ...oldRooms].slice(0, 10); // Keep the 10 latest rooms
          //   });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [queryClient]);

  return { rooms, isLoading, error };
};

export default useRecentRooms;
