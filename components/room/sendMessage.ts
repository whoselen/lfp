import { TypedSupabaseClient } from "@/utils/types";

export const sendMessage = async (
  client: TypedSupabaseClient,
  roomId: number,
  userId: string,
  content: string
): Promise<void> => {
  if (!content.trim()) return;

  const { error } = await client
    .from("room_chat")
    .insert([{ room_id: roomId, user_id: userId, content }]);

  if (error) {
    console.error("Error sending message:", error);
  }
};
