import LfpCard from "@/components/lfp_card";
import useRecentRoomsSubscription from "@/hooks/use-recent-rooms.subscription";
import useRoomSubscription from "@/hooks/use-room-subscription";
import { getGames } from "@/queries/games";
import useRoomStore from "@/stores/room-store";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Components, Virtuoso } from "react-virtuoso";
import useRecentRooms from "./use-recent-rooms";
import LfpRoomSkeleton from "@/components/lfp_card/skeleton";

const List: Components["List"] = forwardRef(
  ({ style, children, ...props }, ref) => {
    return (
      <div
        style={style}
        ref={ref}
        {...props}
        className="space-y-3 flex flex-col items-end last:pb-5 px-4"
      >
        {children}
      </div>
    );
  }
);

const Scroller: Components["Scroller"] = forwardRef(
  ({ style, children, ...props }, ref) => {
    return (
      <div style={style} ref={ref} {...props} className="flex justify-end">
        {children}
      </div>
    );
  }
);

const Item: Components["Item"] = forwardRef<HTMLDivElement, any>(
  ({ style, children, ...props }, ref) => {
    return (
      <div style={style} ref={ref} {...props} className="w-full">
        {children}
      </div>
    );
  }
);

const RecentRooms = () => {
  const supabase = useSupabaseBrowser();

  const {
    data: allGames = [],
    isLoading: allGamesLoading,
    isError: allGamesError,
  } = useQuery(getGames(supabase));

  const searchParams = useSearchParams();
  const activeRoomId = searchParams.get("roomId");

  // useRecentRoomsSubscription();
  useRoomSubscription();

  // const {
  //   rooms: rooms,
  //   resetRooms,
  //   page,
  //   addRooms,
  //   hasMore,
  //   hasRoomsUpdated,
  // } = useRoomStore.getState();

  // const PAGE_SIZE = 6;

  // const fetchRecentRoom = useCallback(async () => {
  //   const { addRooms } = useRoomStore.getState();

  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .select(
  //       `
  //         id,
  //         title,
  //         description,
  //         user_id,
  //         game_id,
  //         rank_id,
  //         max_participants,
  //         room_tags ( tag_id ),
  //         room_accessibility_tools ( tool_id ),
  //         room_game_servers ( server_id )
  //       `
  //     )
  //     .order("id", { ascending: false })
  //     .limit(1);

  //   addRooms(data || []);
  // }, []);

  // const fetchRooms = useCallback(async () => {
  //   if (!hasMore) return; // Stop fetching if no more rooms

  //   const from = page * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;

  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .select(
  //       `
  //         id,
  //         title,
  //         description,
  //         user_id,
  //         game_id,
  //         rank_id,
  //         max_participants,
  //         room_tags ( tag_id ),
  //         room_accessibility_tools ( tool_id ),
  //         room_game_servers ( server_id )
  //       `
  //     )
  //     .order("inserted_at", { ascending: false })
  //     .range(from, to);

  //   if (error) {
  //     console.error("Error fetching rooms:", error);
  //     return;
  //   }

  //   addRooms(data || []);
  // }, []);

  // useEffect(() => {
  //   if (Object.keys(rooms).length === 0) {
  //     fetchRooms(); // Only fetch if no rooms are loaded
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchRecentRoom();
  // }, [hasRoomsUpdated]);

  const { rooms: roomList, isLoading } = useRecentRooms();
  // const roomList = useMemo(() => {
  //   return [...Object.values<any>(rooms || [])].reverse();
  // }, [rooms]);
  if (isLoading) {
    return (
      <div className="w-full flex gap-4 justify-center mx-4 pr-4 h-[calc(100vh-10.5rem)] relative">
        <div className="flex flex-col space-y-2 last:mb-4 w-full mx-auto">
          <div className="space-y-3 flex flex-col items-end last:pb-5 px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <LfpRoomSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex gap-4 justify-center mx-4 pr-4 h-[calc(100vh-10.5rem)] relative">
      <div className="flex flex-col space-y-2 last:mb-4 w-full">
        <Virtuoso
          style={{ height: "100%", width: "100%" }}
          className="h-[calc(100vh-10.5rem)] items-center justify-center flex mx-auto"
          data={roomList}
          // endReached={() => {
          //   if (hasMore) fetchRooms();
          // }}
          components={{ Item, List, Scroller }}
          itemContent={(_index, room: any) => {
            const game = allGames?.find((game) => game.id === room.game_id);
            return (
              <div
                key={room.id}
                className={clsx(
                  "hover:blur-none w-full",
                  activeRoomId &&
                    activeRoomId !== String(room.id) &&
                    "blur-[2px]"
                )}
              >
                <LfpCard
                  id={room.id}
                  title={room.title}
                  description={room.description}
                  max_allowed_size={room.max_participants ?? 0}
                  game={{
                    name: game?.name ?? "",
                    img_url: game?.image_url ?? undefined,
                  }}
                  rank_id={room.rank_id}
                  createdUserId={room.user_id}
                  customTagsIds={
                    room.room_tags.map((tag: any) => tag.tag_id) ?? []
                  }
                  accessibilityToolsIds={
                    room.room_accessibility_tools.map(
                      (tool: any) => tool.tool_id
                    ) ?? []
                  }
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default RecentRooms;

{
  /* {rooms &&
          rooms.map((room) => {
            const game = allGames?.find((game) => game.id === room.game_id);
            return (
              <div
                key={room.id}
                className={clsx(
                  "hover:blur-none",
                  activeRoomId &&
                    activeRoomId !== String(room.id) &&
                    "blur-[2px]"
                )}
              >
                <LfpCard
                  id={room.id}
                  title={room.title}
                  description={room.description}
                  max_allowed_size={room.max_participants ?? 0}
                  room_participants={[]}
                  game={{
                    name: game?.name ?? "",
                    img_url: game?.image_url ?? "",
                  }}
                  rank_id={room.rank_id}
                  createdUserId={room.user_id}
                  customTagsIds={room.room_tags.map((tag) => tag.tag_id) ?? []}
                  accessibilityToolsIds={
                    room.room_accessibility_tools.map((tool) => tool.tool_id) ??
                    []
                  }
                />
              </div>
            );
          })} */
}
