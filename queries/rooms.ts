import { TypedSupabaseClient } from "@/utils/types";

const getRoomById = (client: TypedSupabaseClient, id: number) => {
  return client
    .from("rooms")
    .select(
      `
        id,
        title,
        description
      `
    )
    .eq("id", id)
    .single();
};

const getRecentRooms = (client: TypedSupabaseClient) => {
  return client
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
        room_tags (
          tag_id
        ),
        room_accessibility_tools (
          tool_id
        ),
        room_game_servers (
          server_id
        )
      `
    )
    .order("inserted_at", { ascending: false });
};

const getRecentRoomsPaginated = (
  client: TypedSupabaseClient,
  pagination?: { from: number; to: number }
) => {
  const { from = 0, to = 0 } = pagination || {};

  return client
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
        room_tags (
          tag_id
        ),
        room_accessibility_tools (
          tool_id
        ),
        room_game_servers (
          server_id
        )
      `
    )
    .order("inserted_at", { ascending: false })
    .range(from, to);
};

const getRoomChats = (client: TypedSupabaseClient, roomId: number) => {
  return client
    .from("room_chat")
    .select(
      `
        id,
        content,
        created_at,
        rooms!inner(id),
        profiles (
          id,
          username,
          avatar_url
        )
        `
    )
    .eq("rooms.id", roomId)
    .order("created_at", { ascending: true });
};

export { getRoomById, getRecentRooms, getRecentRoomsPaginated, getRoomChats };
