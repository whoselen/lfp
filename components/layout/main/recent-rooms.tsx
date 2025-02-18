import LfpCard from "@/components/lfp_card";
import { getGames } from "@/queries/games";
import { getRecentRooms } from "@/queries/rooms";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

const RecentRooms = () => {
  const supabase = useSupabaseBrowser();

  const {
    data: rooms = [],
    isLoading: ranksLoading,
    isError: ranksError,
  } = useQuery(getRecentRooms(supabase));

  const {
    data: allGames = [],
    isLoading: allGamesLoading,
    isError: allGamesError,
  } = useQuery(getGames(supabase));

  const searchParams = useSearchParams();
  const activeRoomId = searchParams.get("roomId");

  return (
    <div className="w-full flex gap-4 justify-center mx-4 pr-4">
      <div className="flex flex-col space-y-2 last:mb-4">
        {rooms &&
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
                  game={{ img_url: game?.image_url ?? "" }}
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
          })}
      </div>
    </div>
  );
};

export default RecentRooms;
