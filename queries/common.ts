import { TypedSupabaseClient } from "@/utils/types";

const getUserTags = (client: TypedSupabaseClient) => {
  return client.from("tags").select("id, name");
};

const getUserTagsByIds = (client: TypedSupabaseClient, ids: number[]) => {
  return client.from("tags").select("id, name").in("id", ids);
};

const getUserAccessibilityTools = (client: TypedSupabaseClient) => {
  return client.from("accessibility_tools").select("id, name");
};

// const getRanksByGameId = (client: TypedSupabaseClient, gameId: string) => {
//   return client
//     .from("ranks")
//     .select("id, name, image_url")
//     .eq("game_id", gameId)
//     .throwOnError();
// };

export { getUserTags, getUserTagsByIds, getUserAccessibilityTools };
