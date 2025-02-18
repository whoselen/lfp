import { TypedSupabaseClient } from "@/utils/types";

const getRecentRooms = (client: TypedSupabaseClient) => {
  return client.from("rooms").select(`
  id,
  title,
  description,
  user_id,
  game_id,
  rank_id,
  max_participants,
  room_accessibility_tools (
    tool_id
  ),
  room_game_servers (
    server_id
  ),
  room_tags (
    tag_id
  )
`);
};

export { getRecentRooms };
