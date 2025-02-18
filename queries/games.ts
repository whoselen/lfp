import { TypedSupabaseClient } from "@/utils/types";

const getGames = (client: TypedSupabaseClient) => {
  return client.from("games").select("id, name, description, image_url");
};

const getRanksByGameId = (client: TypedSupabaseClient, gameId: string) => {
  return client
    .from("ranks")
    .select("id, name, image_url")
    .eq("game_id", gameId)
    .throwOnError();
};

const getRankById = (client: TypedSupabaseClient, rankId: number) => {
  return client
    .from("ranks")
    .select("id, name, image_url, rating_prefix")
    .eq("id", rankId)
    .single()
    .throwOnError();
};

const getGameServers = (client: TypedSupabaseClient) => {
  return client.from("game_servers").select("id, name");
};

const getAccessibilityTools = (client: TypedSupabaseClient) => {
  return client.from("accessibility_tools").select("id, name");
};

export {
  getGames,
  getRanksByGameId,
  getGameServers,
  getAccessibilityTools,
  getRankById,
};
