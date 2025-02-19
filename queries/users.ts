import { TypedSupabaseClient } from "@/utils/types";

const getUserById = (client: TypedSupabaseClient, userId: string) => {
  return client
    .from("profiles")
    .select("id, username, avatar_url")
    .eq("id", userId)
    .single()
    .throwOnError();
};

const getUsersByIds = (client: TypedSupabaseClient, userIds: string[]) => {
  return client
    .from("profiles")
    .select("id, username, avatar_url, bio")
    .in("id", userIds)
    .throwOnError();
};

export { getUserById, getUsersByIds };
